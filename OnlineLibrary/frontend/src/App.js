import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import MainPage from "./Components/Pages/Main-Page/Main-Page";
import RankingsPage from "./Components/Pages/rankings/rankings";
import BooksPage from "./Components/Pages/books/books";
import AboutUsPage from "./Components/Pages/about/about";
import AuthContext, {AuthProvider} from "./Components/context/AuthContext";
import PrivateRoute from "./Components/utils/PrivateRoute";
import LoginPage from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Profile from "./Components/Pages/ProfilePage/Profile";

function App() {

    return (
    <>
    <Router forceRefresh>
        <AuthProvider>
        <Navbar/>
        <Switch>
            <PrivateRoute path="/protected">xdd</PrivateRoute>
            <Route path="/rankings" exact> <RankingsPage /> </Route>
            <Route path="/books" exact> <BooksPage/> </Route>
            <Route path="/about" exact> <AboutUsPage/> </Route>
            <Route path="/" exact > <MainPage/> </Route>
            <Route path="/login" exact> <LoginPage/> </Route>
            <Route path="/register" exact> <Register/> </Route>
            <Route path="/profile" exact> <Profile user={AuthContext.contextData} /> </Route>
        </Switch>
        </AuthProvider>
    </Router>
    </>
    );
}

export default App;