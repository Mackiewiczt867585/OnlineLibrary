import argparse
import gc
import os

import pandas as pd
from fuzzywuzzy import fuzz
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors


class KnnRecommender:

    def __init__(self, path_books, path_ratings):
        self.path_books = path_books
        self.path_ratings = path_ratings
        self.book_rating_threshold = 0
        self.user_rating_threshold = 0
        self.model = NearestNeighbors()

    def set_filter_params(self, book_rating_threshold, user_rating_threshold):
        self.book_rating_threshold = book_rating_threshold
        self.user_rating_threshold = user_rating_threshold

    def set_model_parameters(self, n_neighbors, algorithm, metric, n_jobs=None):
        if n_jobs and (n_jobs > 1 or n_jobs == -1):
            os.environ['JOBLIB_TEMP_FOLDER'] = '/tmp'
        self.model.set_params(**{
            'n_neighbors': n_neighbors,
            'algorithm': algorithm,
            'metric': metric,
            'n_jobs': n_jobs})

    def _data_preparation(self):
        df_books = pd.read_csv(
            os.path.join(self.path_books),
            usecols=['ISBN', 'Book-Title', 'Book-Author', 'Year-Of-Publication', 'Publisher'],
            dtype={
                'ISBN': 'str',
                'Book-Title': 'str',
                'Book-Author': 'str',
                'Year-Of-Publication': 'int',
                'Publisher': 'str',
            },
            sep=';',
            encoding='latin-1',
        )
        df_ratings = pd.read_csv(
            os.path.join(self.path_ratings),
            usecols=['UserID', 'ISBN', 'Book-Rating'],
            dtype={
                'UserID': 'int32',
                'ISBN': 'str',
                'Book-Rating': 'float32',
            },
            sep=';',
            encoding='latin-1',
        )

        df_books_count = pd.DataFrame(
            df_ratings.groupby('ISBN').size(),
            columns=['count'])
        popular_books = list(set(df_books_count.query('count >= @self.book_rating_threshold').index))
        books_filter = df_ratings.ISBN.isin(popular_books).values

        df_users_count = pd.DataFrame(
            df_ratings.groupby('UserID').size(),
            columns=['count'])
        active_users = list(set(df_users_count.query('count >= @self.user_rating_threshold').index))
        users_filter = df_ratings.UserID.isin(active_users).values

        df_ratings_filtered = df_ratings[books_filter & users_filter]

        book_user_mat = df_ratings_filtered.pivot(
            index='ISBN', columns='UserID', values='Book-Rating').fillna(0)

        hashmap = {
            book: i for i, book in
            enumerate(list(df_books.set_index('ISBN').iloc[book_user_mat.index].title))
        }

        book_user_mat_sparse = csr_matrix(book_user_mat.values)

        del df_books, df_books_count, df_users_count
        del df_ratings, df_ratings_filtered, book_user_mat
        gc.collect()
        return book_user_mat_sparse, hashmap

    def _fuzzy_matching(self, hashmap, fav_movie):
        match_tuple = []
        for title, idx in hashmap.items():
            ratio = fuzz.ratio(title.lower(), fav_movie.lower())
            if ratio >= 60:
                match_tuple.append((title, idx, ratio))
        match_tuple = sorted(match_tuple, key=lambda x: x[2])[::-1]
        if not match_tuple:
            return None
        else:
            return match_tuple[0][1]

    def _inference(self, model, data, hashmap, fav_movie, n_recommendations):
        model.fit(data)
        idx = self._fuzzy_matching(hashmap, fav_movie)
        distances, indices = model.kneighbors(
            data[idx],
            n_neighbors=n_recommendations + 1
        )
        raw_recommends = \
            sorted(
                list(
                    zip(
                        indices.squeeze().tolist(),
                        distances.squeeze().tolist()
                    )
                ),
                key=lambda x: x[1]
            )[:0:-1]
        return raw_recommends

    def make_recommendations(self, fav_movie, n_recommendations):
        movie_user_mat_sparse, hashmap = self._data_preparation()
        raw_recommends = self._inference(
            self.model, movie_user_mat_sparse, hashmap,
            fav_movie, n_recommendations)
        reverse_hashmap = {v: k for k, v in hashmap.items()}
        print('Recommendations for {}:'.format(fav_movie))
        for i, (idx, dist) in enumerate(raw_recommends):
            print('{0}: {1}, with distance '
                  'of {2}'.format(i + 1, reverse_hashmap[idx], dist))
        return reverse_hashmap


def parse_args():
    parser = argparse.ArgumentParser(
        prog="Book Recommender",
        description="Run KNN Book Recommender")
    parser.add_argument('--path', nargs='?', default='',
                        help='input data path')
    parser.add_argument('--books_filename', nargs='?', default='BX-Books.csv',
                        help='provide books filename')
    parser.add_argument('--ratings_filename', nargs='?', default='BX-Book-Ratings.csv',
                        help='provide ratings filename')
    parser.add_argument('--book_name', nargs='?', default='',
                        help='provide your favoriate book name')
    parser.add_argument('--top_n', type=int, default=10,
                        help='top n movie recommendations')
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()
    data_path = args.path
    books_filename = args.books_filename
    ratings_filename = args.ratings_filename
    book_name = args.book_name
    top_n = args.top_n
    recommender = KnnRecommender(
        os.path.join(data_path, books_filename),
        os.path.join(data_path, ratings_filename))
    recommender.set_filter_params(50, 50)
    recommender.set_model_parameters(20, 'brute', 'cosine', -1)
    recommender.make_recommendations(book_name, top_n)

