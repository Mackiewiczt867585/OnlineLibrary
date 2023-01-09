import React from "react";
import "react-bootstrap";
import { Link } from "react-router-dom";

function NewsList() {

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut sodales enim. Pellentesque tincidunt, tellus nec fringilla molestie, elit erat finibus magna, et blandit neque ligula non erat. Aliquam erat volutpat. Integer sit amet tellus odio. Praesent rutrum sit amet sapien vitae efficitur. Nullam condimentum hendrerit nunc eu rhoncus. Pellentesque augue magna, pharetra ac felis ut, euismod cursus lorem. Nunc condimentum enim in sollicitudin finibus. Donec quis pellentesque felis, vitae congue enim. Cras tempus elit nulla, in venenatis nisl suscipit eget. Nullam eu odio at magna posuere dapibus."
    const mockData = ["News about new Harry Potter books.", "New Shakespeare interpretations.", "Controversy amongst most popular writers."];
    const dataListed = mockData.map( news => <li className="list-item text-left card-text card-body"> <Link to={news} className="list-item-text"> <h1>{news}</h1> </Link> {lorem} </li>);

    return (
        <ol className="list">
            {dataListed}
        </ol>
    );
}

export default React.memo(NewsList);