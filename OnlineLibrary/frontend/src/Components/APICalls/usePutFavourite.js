import {useContext, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";


function UsePutFavourite() {
    const { user } = useContext(AuthContext);
    const [ status, setStatus ] = useContext("");

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const book_id = params.get("t");

    useEffect(() => {
        axios
        .put("http://localhost:8000/api/books/"+String(book_id), user.id)
        .then(response => setStatus(response.data));
    }, []   )

}

export default UsePutFavourite;