import React, {useEffect, useState} from "react";
import "react-bootstrap";
import "./SingleBook.css";
import axios from "axios";


function SingleBook(){
    const [bookData, setBookData] = useState("");
    const [reviewsData, setReviewsData] = useState("");
    let reviewsUrl = "http://localhost:8000/api/reviews/";
    let url = "http://localhost:8000/api/books/";
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("t");
    url = url + bookId;
    reviewsUrl = reviewsUrl + "?book=" + String(bookId);

    useEffect( () => {
         axios
            .get(url)
            .then((response) => {
                setBookData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [url]);

    useEffect(() => {
        axios
            .get(reviewsUrl)
            .then((response) => {
                setReviewsData(response.data.results)
            })
            .catch(error => {
                console.log(error);
            })
    }, [reviewsUrl]);

    console.log(reviewsData);

    return (
      <>
        <div className="card">
            <div className="row">
                <div className="col-md-3">
                    <img src={bookData.image_l} alt="Book cover"/>
                </div>
                <div className="col-md-8">
                <h1 className="card-header">{bookData.title}</h1>
                    <span className="card-text"> {bookData.author}</span>

                    <div className="card-body">
                        <h1 className="card-header">Reviews</h1>
                        <ul className="list">
                        {reviewsData.map(review => (
                                <li className="border" key={review.pk}>
                                    <h2 className="card-text"> Review by {review.author}: </h2>
                                    <span>{review.content}</span><br></br>
                                    <span>Book rating: {review.rating} / 5</span> <br></br>
                                    <span>Review upvote ratio: {(review.upvote.length / (review.upvote.length + review.downvote.length)) * 100}%</span> <br></br>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default SingleBook;