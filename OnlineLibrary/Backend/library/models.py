from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
import numpy as np
import pickle

def recommend_book(book_name):
    book_pivot = pickle.load(open('/backend/library/book_pivot.pkl', 'rb'))
    model = pickle.load(open('/backend/library/model.pkl', 'rb'))
    try:
        book_id = np.where(book_pivot.index == book_name)[0][0]
    except:
        return None
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)
    recommendations_list = []

    for i in range(len(suggestion)):
        books = book_pivot.index[suggestion[i]]
        for j in books:
            if j == book_name:
                pass
            else:
                recommendations_list.append(j)
    return recommendations_list

RATING_CHOICES = [
    ('1', 1),
    ('2', 2),
    ('3', 3),
    ('4', 4),
    ('5', 5),
]

CATEGORIES = [
    ('bl', 'blank'),
    ('ad','Adventure'),
    ('cs','Classics'),
    ('cr','Criminal'),
    ('fk', 'Folk'),
    ('fs', 'Fantasy'),
    ('hs', 'Historical'),
    ('hr', 'Horror'),
    ('hm', 'Humour and satire'),
    ('lf', 'Literary fiction'),
    ('ms', 'Mystery'),
    ('pt', 'Poetry'),
    ('ps', 'Plays'),
    ('rm', 'Romance'),
    ('sf', 'Science fiction'),
    ('ss', 'Short stories'),
    ('th', 'Thriller'),
    ('wr', 'War'),
    ('wf', 'Womens fiction'),
    ('ya', 'Young adult'),
    ('ab', 'Autobiography'),
    ('bp', 'Biography'),
    ('es', 'Essay'),
    ('nf', 'Non-fiction novel'),
    ('sh', 'Self-help'),
]


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, username, first_name, password, **other_fields):

        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned all permissions.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned all permissions.")

        return self.create_user(
            email=email,
            username=username,
            first_name=first_name,
            password=password,
            **other_fields
        )

    def create_user(self, email, username, first_name, password, **other_fields):
        if not email:
            raise ValueError("An email must be given to create an account.")
        if not username:
            raise ValueError("A username must be given to create an account")
        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, first_name=first_name, **other_fields
        )
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="email")
    username = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="username",
    )
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    creation_date = models.DateTimeField(default=timezone.now)
    organisation = models.CharField(max_length=150)

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    objects = CustomAccountManager()

    def __str__(self):
        return self.username

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()

class Category(models.Model):
    name = models.CharField(max_length=255, default=None)

    def __str__(self):
        return self.name


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    isbn = models.CharField(max_length=255, default=None)
    title = models.CharField(max_length=255, default=None)
    author = models.CharField(max_length=255, default=None)
    publication_year = models.CharField(max_length=10, default=None)
    publisher = models.CharField(max_length=255, default=None)
    image_s = models.CharField(default=None, max_length=255)
    image_m = models.CharField(default=None, max_length=255)
    image_l = models.CharField(default=None, max_length=255)
    book_file = models.FileField(upload_to="files/", default=None, null=True)
    recommended = models.BooleanField(default=False)
    favourite = models.ManyToManyField(CustomUser, related_name="favourite_titles")
    categories = models.ManyToManyField(Category, related_name="categories")

    def __str__(self):
        return f'{self.author} - {self.title}'

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()

    def recommend(self):
        recommendation_titles = recommend_book(self.title)
        recommendations = []
        try:
            for title in recommendation_titles:
                recommendations.append(Book.objects.filter(title=title).first())
        except:
            return None
        return recommendations



class Review(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.CharField(max_length=255, default=None)
    rating = models.CharField(max_length=1, choices=RATING_CHOICES)
    upvote = models.ManyToManyField(CustomUser, related_name="upvote", default=None, blank=True)
    downvote = models.ManyToManyField(CustomUser, related_name="downvote", default=None, blank=True)

    def __str__(self):
        return f'Review for {self.book.title} written by {self.author.username}.'

    def get_votes_ratio(self):
        return (self.upvote.count()/(self.upvote.count() + self.downvote.count())) * 100

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()




