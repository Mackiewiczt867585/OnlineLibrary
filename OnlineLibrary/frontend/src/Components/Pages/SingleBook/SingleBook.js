import React, {useEffect, useState} from "react";
import "react-bootstrap";
import "./SingleBook.css";
import axios from "axios";
import {Link} from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

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
        titles_list.push(<h4 className="card-text"><Link to={"/title?t="+String(bookData.recommendations[i][0])}>{bookData.recommendations[i][1]}</Link></h4>);
    }

    let reviews_list = [];
    for (let i in reviewsData){
        reviews_list.push(
            <li className="border" key={reviewsData[i].pk}>
                <h2 className="card-text"> Review by {reviewsData[i].author}: </h2><br></br>
                <span>{reviewsData[i].content}</span><br></br><br></br>
                <span>Book rating: {reviewsData[i].rating} / 5</span> <br></br>
                <span>Review upvote ratio: {(reviewsData[i].upvote.length / (reviewsData[i].upvote.length + reviewsData[i].downvote.length)) * 100}%</span> <br></br>
            </li>
        )
    }
    const temp = String(bookData.book_file);
    const temp2 = temp.split("/").pop();
    let read_url = "/read?t="+temp2;

    let read_button = <Link to={read_url}>Read Book</Link>

    return (
      <>
        <div className="card">
            <div className="row">
                <div className="col-md-3">
                    <img src={bookData.image_l} alt="Book cover"/><br></br>
                    {read_button}
                </div>
                <div className="col-md-8">
                <h1 className="card-header">{bookData.title}</h1><br></br>
                    <div className="synopsis">
                    <span >{bookData.synopsis}</span><br></br>
                    </div>
                    <span className="card-text">Written by {bookData.author}</span><br></br>
                        <h1 className="card-header">Reviews:</h1>
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