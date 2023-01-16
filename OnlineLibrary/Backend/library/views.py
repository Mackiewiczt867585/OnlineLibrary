from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from library.models import Book, CustomUser, Review, Category
from library.serializers import BookSerializer, MyTokenObtainPairSerializer, RegisterSerializer, ReviewSerializer, CategorySerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters import FilterSet, RangeFilter, DateFromToRangeFilter, BaseCSVFilter, CharFilter
from django.contrib.postgres.fields import ArrayField

class RootApi(generics.GenericAPIView):
    name = 'root-api'

    def get(self, request, *args, **kwargs):
        return Response({
            'books-list': reverse(BooksListView.name, request=request),
            'reviews-list': reverse(ReviewListView.name, request=request),
            'users-list': reverse(UsersLstView.name, request=request),
            'categories-list': reverse(CategoriesListView.name, request=request),
        })


class BooksFilter(FilterSet):
    class Meta:
        model = Book
        fields = {
            'isbn',
            'title',
            'author',
            'publisher',
            'recommended',
        }


class BooksListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    ordering_fields = ['pk']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', "author"]
    filter_class = BooksFilter
    filterset_fields = [
        'author',
        'publisher',
        'recommended',
        'categories',
    ]
    name = 'books-list'


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    name = 'book-details'

class ReviewsFilter(FilterSet):

    class Meta:
        model = Review
        fields = [
            'book',
        ]

class ReviewListView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_class = None
    ordering_fields = ['pk']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = None
    filterset_fields = ['book']
    name = 'reviews-list'
    lookup_field = ['content']

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    name = 'review-details'
    


class UsersLstView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    ordering_fields = ['pk']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    name = 'users-list'

class UsersDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    name = 'users-details'

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CategoriesListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    name = 'categories-list'

class CategoriesDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    name = 'categories-details'
