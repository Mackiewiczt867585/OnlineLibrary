import React from "react";
import "react-bootstrap";
import NewsList from "../../NewsList/NewsList";
import "./Main-Page.css";
import useGetRecommendedBooks from "../../APICalls/useGetRecommendedBooks";

function MainPage() {

    return (
        <>
            <div className="container">

                <div className="row">

                    <div className="col-md-5 title-border card">
                        <h1 className="title text-center card-header"> News </h1>
                        <NewsList/>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-5 title-border card ">
                        <h1 className="title text-center card-header"> We Recommend </h1>
                        {useGetRecommendedBooks()}
                    </div>

                </div>

            </div>
        </>
    );
}

export default MainPage;