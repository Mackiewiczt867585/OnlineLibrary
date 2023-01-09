import React from "react";
import "react-bootstrap";


function WeRecommendList(data) {

    const dataListed = data.map(book => <li className="list-item text-left card-text card-body"><h1>{book.title} by {book.Author}</h1></li> );

        return (
            <ol className="list">
                {dataListed}
            </ol>
        );
}

export default WeRecommendList;