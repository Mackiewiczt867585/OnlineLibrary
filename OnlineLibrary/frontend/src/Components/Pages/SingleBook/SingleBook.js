import React, {useEffect, useState} from "react";
import "react-bootstrap";
import "./SingleBook.css";
import axios from "axios";
import useGetRecommendations from "../../APICalls/useGetRecommendation";


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

    let titles_list = [];
    for (let i in bookData.recommendations){
        titles_list.push(<h4 className="card-text">{bookData.recommendations[i]}</h4>);
    }

    let reviews_list = [];
    for (let i in reviewsData){
        reviews_list.push(
            <li className="border" key={reviewsData[i].pk}>
                <h2 className="card-text"> Review by {reviewsData[i].author}: </h2>
                <span>{reviewsData[i].content}</span><br></br>
                <span>Book rating: {reviewsData[i].rating} / 5</span> <br></br>
                <span>Review upvote ratio: {(reviewsData[i].upvote.length / (reviewsData[i].upvote.length + reviewsData[i].downvote.length)) * 100}%</span> <br></br>
            </li>
        )
    }

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
                        <h1 className="card-header">Reviews</h1>
                        <ul className="list">
                            {reviews_list}
                        </ul>
                <h1 className="card-header">Similar Titles</h1>
                    {titles_list}
                </div>
            </div>
        </div>
      </>
    );
}

export default SingleBook;