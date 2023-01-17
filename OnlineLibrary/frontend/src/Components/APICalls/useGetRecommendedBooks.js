import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function useGetRecommendedBooks() {

    const [data, setData] = useState([]);

    useEffect( () => {
        axios
            .get("http://localhost:8000/api/books/?recommended=true")
            .then((response) => {
                setData(response.data.results);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    let recommendations_list = [];
    for (let i in data){
        recommendations_list.push(
            <li className="border" key={data[i].id}>
                            <div className="row">
                                <div className="col-sm-1">
                                    <img src={data[i].image_l} alt="Book cover" className="cover-img"/>
                                </div>
                                <div className="col-sm-5"/>
                                <div className="col-sm-7">
                                    <h1><Link to={"/title?t="+String(data[i].pk)} className="list-item-text">{data[i].title}</Link></h1> <h2> by {data[i].author}</h2>
                                </div>
                            </div>
                        </li>
        );
    }

    return (
        <>
            <ol className="list">
                {recommendations_list}
            </ol>
        </>
    );
};

export default useGetRecommendedBooks;