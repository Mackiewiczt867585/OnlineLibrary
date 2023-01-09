import React from "react";
import "react-bootstrap";
import "./rankings.css";

function RankingsPage(){


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 card title-border">
                    <h1 className="text-center card-header">Categories</h1>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8 card title-border">
                    <h1 className="text-center card-header">Titles</h1>
                </div>
            </div>
        </div>
    );
};

export default RankingsPage;