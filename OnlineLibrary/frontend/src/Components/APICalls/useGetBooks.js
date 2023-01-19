import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function useGetBooks(url="http://localhost:8000/api/books/?") {

    const [data, setData] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const keys = urlParams.keys();
    let tempString = "";
    let finalUrl = url;
    for (const key of keys) {
        tempString = String(key)+"="+String(urlParams.get(key))+"&";
        finalUrl = finalUrl+tempString;
    }

    console.log(finalUrl);

    useEffect(() => {
       axios
           .get(finalUrl)
           .then((response) => {
                setData(response.data.results);
           })
           .catch(error => {
               console.log(error);
           })
    }, [finalUrl]);

    let results_list = [];
    for (let i in data){
        results_list.push(
            <li className="border" key={data[i].id}>
                <div className="row">
                    <div className="col-sm-1">
                        <img src={data[i].image_m} alt="Book cover"/>
                    </div>
                    <div className="col-sm-4"/>
                    <div className="col-sm-7">
                        <h1><Link to={"/title?t="+String(data[i].pk)}>{data[i].title}</Link></h1> <h2> by {data[i].author}</h2>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <>
            <ul className="list">
                {results_list}
            </ul>
        </>
    );
}

export default useGetBooks;