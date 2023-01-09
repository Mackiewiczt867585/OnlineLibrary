import {useEffect, useState} from "react";
import axios from "axios";

function useSearchBooks(){
    const [data, setData] = useState([]);
    const url = "http://localhost:8000/api/books?search=";

    useEffect(() => {
       axios
           .get(url)
           .then((response) => {
               console.log(response);
               setData(response.data.results);
           })
           .catch( error => {
               console.log(error);
           })
    }, []);
}