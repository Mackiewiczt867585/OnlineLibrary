from rest_framework import serializers

from library.models import Book


class BookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=90)

    def create(self, validated_data):
        return Book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.save()
        return instance

    class Meta:
        model = Book
        fields = [
            'pk',
            'title',
            'Author',
            'ISBN',
            'publisher',
            'book_file',
            'book_cover',
        ]
