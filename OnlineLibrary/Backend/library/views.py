import django_filters
from django.shortcuts import render
from django.views.generic import TemplateView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django_filters import FilterSet, RangeFilter, DateFromToRangeFilter
from django_filters.widgets import RangeWidget
from rest_framework import permissions

from library.models import Book
from library.serializers import BookSerializer


class RootApi(generics.GenericAPIView):
    name = 'root-api'

    def get(self, request, *args, **kwargs):
        return Response({
            'books-list': reverse(BooksListView.name, request=request)
        })


class BooksFilter(FilterSet):
    title = django_filters.CharFilter(title__contains='')


    class Meta:
        model = Book
        fields = ['title', 'author', 'title', 'publisher']


class BooksListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = []
    name = 'books-list'
    filter_backends = DjangoFilterBackend
    filter_fields = ['title', 'author', 'title', 'publisher']
    ordering_fields = ['title', 'author', 'title', 'publisher']
    search_fields = ['title', 'author', 'title', 'publisher']


class BooksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = []
    name = 'books-detail'

