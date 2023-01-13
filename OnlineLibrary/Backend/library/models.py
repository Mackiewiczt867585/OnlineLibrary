from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone


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
    recommended = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.Author} - {self.title}'

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()
