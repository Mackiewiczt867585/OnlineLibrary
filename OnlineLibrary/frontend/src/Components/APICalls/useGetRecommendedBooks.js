import {useEffect, useState} from "react";
import axios from "axios";

function useGetRecommendedBooks() {

    const [data, setData] = useState([]);

    useEffect(() => {
       axios
           .get("http://localhost:8000/api/books?ordering=pk")
           .then((response) => {
               console.log(response);
               setData(response.data.results);
           })
           .catch( error => {
               console.log(error);
           })
    }, []);

    return (
        <>
            <ol className="list">
            {data.map(book => (
                <li key={book.id}> <img src={book.image_m} alt="Book cover"/><h1>{book.title}</h1> <h2> by {book.author}</h2></li>
            ))}
            </ol>
        </>
    );
};

export default useGetRecommendedBooks;