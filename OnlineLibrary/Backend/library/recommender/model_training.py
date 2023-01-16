import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import pickle

books_filename = 'BX-Books.csv'
ratings_filename = 'BX-Book-Ratings.csv'
users_filename = 'BX-Users.csv'

books = pd.read_csv(books_filename, sep=";", on_bad_lines="skip", encoding='latin-1')


books = books[['ISBN', 'Book-Title', 'Book-Author', 'Year-Of-Publication', 'Publisher', 'Image-URL-L']]


books.rename(columns={"Book-Title": 'title',
                      'Book-Author':' author',
                     "Year-Of-Publication": 'year',
                     "Publisher": "publisher",
                     "Image-URL-L": "image_url"}, inplace=True)


users = pd.read_csv(users_filename, sep=";", on_bad_lines="skip", encoding='latin-1')

ratings = pd.read_csv(ratings_filename, sep=";", on_bad_lines="skip", encoding='latin-1')

ratings.rename(columns={"User-ID": 'user_id',
                      'Book-Rating': 'rating'}, inplace=True)

x = ratings['user_id'].value_counts() > 200

y = x[x].index

ratings = ratings[ratings['user_id'].isin(y)]

ratings_with_books = ratings.merge(books, on='ISBN')


number_rating = ratings_with_books.groupby('title')['rating'].count().reset_index()

number_rating.rename(columns={'rating': 'num_of_rating'}, inplace=True)

final_rating = ratings_with_books.merge(number_rating, on='title')


final_rating = final_rating[final_rating['num_of_rating'] >= 50]

final_rating.drop_duplicates(['user_id', 'title'], inplace=True)


book_pivot = final_rating.pivot_table(columns='user_id', index='title', values='rating')

book_pivot.fillna(0, inplace=True)

book_sparse = csr_matrix(book_pivot)
model = NearestNeighbors(algorithm='brute')
model.fit(book_sparse)
distance, suggestion = model.kneighbors(book_pivot.iloc[237, :].values.reshape(1, -1), n_neighbors=6)

book_names = book_pivot.index

book_name = []
for book_id in suggestion:
    book_name.append(book_pivot.index[book_id])

ids_index = []
for name in book_name[0]:
    ids = np.where(final_rating['title'] == name)[0][0]
    ids_index.append(ids)

for idx in ids_index:
    url = final_rating.iloc[idx]['image_url']

pickle.dump(model, open('model.pkl', 'xb'))
pickle.dump(book_names, open('book_names.pkl', 'xb'))
pickle.dump(final_rating, open('final_rating.pkl', 'xb'))
pickle.dump(book_pivot, open('book_pivot.pkl', 'xb'))
