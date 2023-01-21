import React from "react";
import "react-bootstrap";
import "./books.css";
import useGetBooks from "../../APICalls/useGetBooks";
import {SearchInput, FilterInput} from "../../SearchInput/SearchInput";
import {Link} from "react-router-dom";


function pgup(){
    const filter_element_id = "offset";
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (params.get("offset") === null) params.set(filter_element_id, 10);
    else {
        params.set(filter_element_id, parseInt(params.get("offset"))+10);
    }
    let finalUrl = params.toString() + "&";
    if (finalUrl.includes("?") !== true) finalUrl = "?" + finalUrl;
    window.location.replace(finalUrl);
}
function pgdn(){
    const filter_element_id = "offset";
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (params.get("offset") === "10") params.delete(filter_element_id);
    else {
        params.set(filter_element_id, parseInt(params.get("offset"))-10);
    }
    let finalUrl = params.toString() + "&";
    if (finalUrl.includes("?") !== true) finalUrl = "?" + finalUrl;
    window.location.replace(finalUrl);
}


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
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <button onClick={pgdn}>Previous Page</button>
                        <button onClick={pgup}>Next Page</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BooksPage;