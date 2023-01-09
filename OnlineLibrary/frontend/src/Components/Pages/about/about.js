import React from "react";
import "react-bootstrap";
import "./about.css";
import AboutUsCard from "../../AboutUsCard/AboutUsCard";

function AboutUsPage(){

    return (
        <>
            <div className="container">
                <div>
                <AboutUsCard/>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;