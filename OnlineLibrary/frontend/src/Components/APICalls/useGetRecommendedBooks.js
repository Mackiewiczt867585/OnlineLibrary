import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function useGetRecommendedBooks() {

    const [data, setData] = useState([]);

    useEffect(() => {
       axios
           .get("http://localhost:8000/api/books?recommended=true")
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
                <li key={book.id}> <img src={book.image_m} alt="Book cover"/><h1><Link to={book.title}>{book.title}</Link></h1> <h2> by {book.author}</h2></li>
            ))}
            </ol>
        </>
    );
};

export default useGetRecommendedBooks;