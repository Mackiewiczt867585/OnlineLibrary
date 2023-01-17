import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../context/AuthContext";

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);

    const navbar = user ? (
        <>
         <nav className="fixed-nav-bar">
             <div className="navbar-container">
                 <Link to="/" className="nav-item">
                     Main Page
                 </Link>
                 <Link to="/books" className="nav-item">
                     Books
                 </Link>
                 {/*<Link to="/rankings" className="nav-item">*/}
                 {/*    Rankings*/}
                 {/*</Link>*/}
                 <Link to="/about" className="nav-item">
                    About us
                 </Link>
                 <Link to="/profile" className="nav-item">
                     Profile
                 </Link>
                 <button onClick={logoutUser} className="nav-item">
                    Logout
                 </button>
             </div>
         </nav>
        </>
    ) : (
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
                 <Link to="/login" className="nav-item">
                    Log in
                 </Link>
                 <Link to="/register" className="nav-item">
                     Register
                 </Link>
             </div>
         </nav>
        </>
    );

    return navbar;
}

export default Navbar;