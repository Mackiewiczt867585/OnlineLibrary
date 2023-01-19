import React, {useEffect, useState} from "react";
import "react-bootstrap";
import "./SingleBook.css";
import axios from "axios";
import useGetRecommendations from "../../APICalls/useGetRecommendation";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function download(file){
    console.log(file);
    // window.location.href = "http://localhost:8000/api/books/"+String(file);
}


function SingleBook(){
    const [bookData, setBookData] = useState("");
    const [reviewsData, setReviewsData] = useState("");
    let reviewsUrl = "http://localhost:8000/api/reviews/";
    let url = "http://localhost:8000/api/books/";
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("t");
    url = url + bookId;
    reviewsUrl = reviewsUrl + "?book=" + String(bookId);

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula leo, faucibus viverra massa id, hendrerit gravida justo. Aliquam quis magna velit. Aenean nulla libero, venenatis at porta et, semper in dolor. Sed tincidunt sem est, in malesuada arcu venenatis vitae. Vestibulum lobortis justo ac massa ultricies, a viverra odio ullamcorper. Mauris nibh ante, sodales at rhoncus nec, varius ut massa. Nullam posuere sit amet tellus id pulvinar. Nam in faucibus purus. Pellentesque dui nibh, euismod vitae lorem vel, maximus volutpat lacus. Aenean mattis ornare velit in luctus. Fusce sit amet tempus turpis. Donec ullamcorper eros sodales, iaculis magna id, tincidunt nisi. Curabitur feugiat diam viverra interdum lobortis. Donec sed urna a odio ullamcorper gravida. Nulla a mauris lacus."

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
    console.log(bookData.recommendations);
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

    return (
      <>
        <div className="card">
            <div className="row">
                <div className="col-md-3">
                    <img src={bookData.image_l} alt="Book cover"/>
                </div>
                <div className="col-md-8">
                <h1 className="card-header">{bookData.title}</h1><br></br>
                    <div className="synopsis">
                    <span >{bookData.synopsis}</span><br></br>
                    </div>
                    <span className="card-text">Written by {bookData.author}</span><br></br>
                        <h1 className="card-header">Reviews</h1>
                        <ul className="list">
                            {reviews_list}
                        </ul>
                <h1 className="card-header">Similar Titles</h1>
                    {titles_list}
                </div>
                <iframe title="pdf" src={bookData.book_file}></iframe>
            </div>
        </div>
      </>
    );
}

export default SingleBook;