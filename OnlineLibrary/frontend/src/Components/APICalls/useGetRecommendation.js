import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function useGetRecommendations(pk){
    const [recommendation, setRecommendation] = useState("");
    const url = "http://localhost:8000/api/books/"+String(pk);


    useEffect(() => {
       axios
           .get(url)
           .then((response) => {
               setRecommendation(response);
           })
           .catch(error => {
               console.log(error)
           });
    }, [url]);

    return (
        <div className="row">
            <div className="col-sm-1">
                <img src={recommendation.image_l} alt="Book cover" className="cover-img"/>
            </div>
            <div className="col-sm-5"/>
            <div className="col-sm-7">
                <h1><Link to={"/title?t="+String(recommendation.pk)} className="list-item-text">{recommendation.title}</Link></h1> <h2> by {recommendation.author}</h2>
            </div>
        </div>
    );
}

export default useGetRecommendations;