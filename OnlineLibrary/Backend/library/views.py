from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from library.models import Book, CustomUser
from library.serializers import BookSerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters import FilterSet, RangeFilter, DateFromToRangeFilter

from library.serializers import MyTokenObtainPairSerializer, RegisterSerializer


class RootApi(generics.GenericAPIView):
    name = 'root-api'

    def get(self, request, *args, **kwargs):
        return Response({
            'books-list': reverse(BooksListView.name, request=request),
        })

class BooksFilter(FilterSet):
    class Meta:
        model = Book
        fields = [
            'isbn',
            'title',
            'author',
            'publisher',
            'recommended',
        ]

class BooksListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_class = BooksFilter
    ordering_fields = ['pk']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', "author"]
    filterset_fields = [
        'author',
        'publisher',
        'recommended',
    ]
    name = 'books-list'


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    name = 'book-details'

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

