from rest_framework import serializers

from library.models import Book, CustomUser, Review, Category
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class BookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=90)
    recommendations = serializers.ListField(
        source="recommend",
        child=serializers.ListField(
            child=serializers.CharField(), required=False,
        )
    )
    book_file = serializers.FileField(required=False, use_url=False)
    def create(self, validated_data):
        return Book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.isbn = validated_data.get('isbn', instance.isbn)
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.publisher = validated_data.get('publisher', instance.publisher)
        instance.publication_year = validated_data.get('publication_year', instance.publication_year)
        instance.image_s = validated_data.get("image_s", instance.image_s)
        instance.image_m = validated_data.get("image_m", instance.image_m)
        instance.image_l = validated_data.get("image_l", instance.image_l)
        instance.book_file = validated_data.get("book_file", instance.book_file)
        instance.recommended = validated_data.get('recommended', instance.recommended)
        instance.synopsis = validated_data.get('synopsis', instance.synopsis)
        instance.favourite.add(*validated_data.get('favourite'))
        instance.categories.add(*validated_data.get('categories'))
        instance.save()
        return instance

    class Meta:
        model = Book
        fields = [
            'pk',
            'isbn',
            'title',
            'author',
            'publisher',
            'synopsis',
            'publication_year',
            'image_s',
            'image_m',
            'image_l',
            'book_file',
            'recommended',
            'categories',
            'recommendations',
            'favourite',
        ]

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

    class Meta:
        model = Category
        fields = [
            'id',
            'name'
        ]

class ReviewSerializer(serializers.ModelSerializer):
    content = serializers.CharField(max_length=255)
    rating = serializers.CharField(max_length=1)
    author = serializers.CharField(source="get_username")

    def create(self, validated_data):
        return Review.objects.create(
            author = validated_data.get('author'),
            book = validated_data.get('book'),
            content = validated_data.get('content'),
            rating = validated_data.get('rating'),
        )

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.upvote.add(*validated_data.get('upvote'))
        instance.downvote.add(*validated_data.get('downvote'))
        instance.save()
        return instance

    class Meta:
        model = Review
        fields = [
            'pk',
            'author',
            'book',
            'content',
            'rating',
            'upvote',
            'downvote',
        ]



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        write_only=True,
        required=True,
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('pk','email','username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

