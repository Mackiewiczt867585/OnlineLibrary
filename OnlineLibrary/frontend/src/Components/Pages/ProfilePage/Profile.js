import React, {useContext} from "react";
import "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import useGetFavouriteBooks from "../../APICalls/useGetFavouriteBooks";

function Profile() {

    const { user } = useContext(AuthContext);

    return (
        <div className="row">

            <div className="col-md-3 card">
                <div className="card-body col">
                <li><img alt="profile" src="https://media.istockphoto.com/id/1209654046/pl/wektor/ikona-profilu-awatara-u%C5%BCytkownika-czarna-ilustracja-wektorowa.jpg?s=612x612&w=is&k=20&c=jL3FhhXc5I7w274-eUGTeoq1FrPakyxxISNIqMLGYYA="/></li>
                <li><span className="card-text">{user.username}</span></li>
                <li><span className="card-text">{user.email}</span></li>
                </div>
            </div>

            <div className="col-md-1">

            </div>

            <div className="col-md-7 card">
                <div className="card-body">
                <h1 className="card-header">Favourite Titles</h1>
                    {useGetFavouriteBooks(user.user_id)}
                </div>
            </div>

        </div>
    );
}

export default Profile;