import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function useGetFavouriteBooks(user_id){
        const [data, setData] = useState("");
        const url = 'http://localhost:8000/api/books/?favourite='+String(user_id);

        useEffect(() => {
            axios
                .get(url)
                .then((response) => {
                    setData(response.data.results);
                })
                .catch(error => {
                    console.log(error);
                })
        }, [url]);

        let favourites_list = [];
        for (let i in data){
            favourites_list.push(
            <li className="border" key={data[i].id}>
                <h1><Link to={"/title?t="+String(data[i].pk)} className="list-item-text">{data[i].title}</Link></h1> <h2> by {data[i].author}</h2>
            </li>
        );
    }


        return (
        <>
            {favourites_list}
        </>
    );
}

export default useGetFavouriteBooks;