import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function useGetRecommendedBooks() {

    const [data, setData] = useState([]);

    useEffect( () => {
        axios
            .get("http://localhost:8000/api/books/?recommended=true")
            .then((response) => {
                setData(response.data.results);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <ol className="list">
            {data.map(book => (
                <li className="border" key={book.id}>
                            <div className="row">
                                <div className="col-sm-1">
                                    <img src={book.image_l} alt="Book cover" className="cover-img"/>
                                </div>
                                <div className="col-sm-5"/>
                                <div className="col-sm-7">
                                    <h1><Link to={"/title?t="+String(book.pk)} className="list-item-text">{book.title}</Link></h1> <h2> by {book.author}</h2>
                                </div>
                            </div>
                        </li>
            ))}
            </ol>
        </>
    );
};

export default useGetRecommendedBooks;