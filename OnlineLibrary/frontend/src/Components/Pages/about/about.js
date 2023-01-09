import React from "react";
import "react-bootstrap";
import "./about.css";
import useGetBooks from "../../../APICalls/Queries";

function AboutUsPage(){
    const {data} = useGetBooks()

    return (
        <>

        </>
    );
};

export default AboutUsPage;