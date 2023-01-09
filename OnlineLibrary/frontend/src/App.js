import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import MainPage from "./Components/Pages/Main-Page/Main-Page";
import RankingsPage from "./Components/Pages/rankings/rankings";
import BooksPage from "./Components/Pages/books/books";
import AboutUsPage from "./Components/Pages/about/about";

function App() {
    return (
        <>
         <Router>
          <Navbar/>
             <Routes>
                 <Route path="/" exact element={<MainPage />} />
                 <Route path="/" element={<MainPage />} />
                 <Route path="/rankings" element={<RankingsPage/>} />
                 <Route path="/books" element={<BooksPage/>}/>
                 <Route path="/about" element={<AboutUsPage/>} />
             </Routes>
         </Router>
        </>
    );
}

export default App;