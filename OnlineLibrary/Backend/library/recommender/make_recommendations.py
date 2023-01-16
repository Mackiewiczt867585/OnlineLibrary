import numpy as np
import pickle

book_pivot = pickle.load(open('book_pivot.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))


def recommend_book(book_name):
    book_id = np.where(book_pivot.index == book_name)[0][0]
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)

    for i in range(len(suggestion)):
        books = book_pivot.index[suggestion[i]]
        for j in books:
            if j == book_name:
                print(f"You searched '{book_name}'\n")
                print("The suggestion books are: \n")
            else:
                print(j)


book_name = "Midnight in the Garden of Good and Evil: A Savannah Story"

recommend_book(book_name)

