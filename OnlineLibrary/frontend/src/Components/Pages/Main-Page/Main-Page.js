import React from "react";
import "react-bootstrap";
import NewsList from "../../NewsList/NewsList";
import "./Main-Page.css";
import WeRecommendList from "../../WeRecommendList/WeRecommend";
import useGetBooks from "../../../APICalls/Queries";

function MainPage() {

    const {data: books} = useGetBooks("http://localhost:8000/api/books");

    return (
        <>
            <div className="container">

                <div className="row">

                    <div className="col-md-5 title-border card">
                        <h1 className="text-center card-header"> News </h1>
                        <NewsList/>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-5 title-border card ">
                        <h1 className="text-center card-header"> We Recommend </h1>
                        <WeRecommendList data={books} />
                    </div>

                </div>

            </div>
        </>
    );
}

export default MainPage;