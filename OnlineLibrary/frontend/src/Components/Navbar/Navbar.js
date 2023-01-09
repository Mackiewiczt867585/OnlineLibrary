import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const { user, logout} = { 'Tomek' : 'B)' };
    const pathname = window.location.pathname;

    const navbar = (
        <>
         <nav className="fixed-nav-bar">
             <div className="navbar-container">
                 <Link to="/" className="nav-item">
                     Main Page
                 </Link>
                 <Link to="/books" className="nav-item">
                     Books
                 </Link>
                 <Link to="/rankings" className="nav-item">
                     Rankings
                 </Link>
                 <Link to="/about" className="nav-item">
                    About us
                 </Link>
                 <Link to="/" className="nav-item">
                    Logout
                 </Link>
             </div>
         </nav>
        </>
    );

    return navbar;
}

export default Navbar;