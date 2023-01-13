import React from "react";
import "react-bootstrap";
import "./AboutUsCard.css";

function AboutUsCard (){

    return (
        <>
            <div className="card">
                <h1 className="card-header">Projekt wykonał</h1>
                <span className="card-text">Tomasz Edmund Maćkiewicz pod opieką Dr. Vitaliy Yakovyny</span>
            </div>
            <div className="card">
                <h1 className="card-header">Kontakt</h1>
                <span className="card-text"> 155299@student.uwm.edu.pl</span>
                <span className="card-text"> mackiewiczt26@gmail.com</span>
            </div>
        </>
    );
}

export default AboutUsCard;