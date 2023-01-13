from rest_framework import serializers

from library.models import Book, CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class BookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=90)

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
        instance.recommended = validated_data.get('recommended', instance.recommended)
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
            'publication_year',
            'image_s',
            'image_m',
            'image_l',
            'recommended',
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
        fields = ('email','username', 'password', 'password2')

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