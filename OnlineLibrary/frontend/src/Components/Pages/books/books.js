import React from "react";
import "react-bootstrap";
import "./books.css";
import useGetBooks from "../../APICalls/useGetBooks";
import {SearchInput, FilterInput} from "../../SearchInput/SearchInput";
import {Link} from "react-router-dom";

function BooksPage(){

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-3 card title-border">
                    <h1 className="text-center card-header">Search</h1>
                        <SearchInput/>
                    <h1 className="text-center card-header">Filter Categories: </h1>
                    <FilterInput/> <br></br>
                    <button href="/books"><Link to="/books">Reset Filters  </Link></button>
                    </div>

                <div className="col-md-1"></div>

                <div className="col-md-8 card title-border">
                    <h1 className="text-center card-header">Titles</h1>
                    {useGetBooks()}
                </div>

            </div>
        </div>
    );
};

export default BooksPage;