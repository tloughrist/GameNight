import './Banner.css';
import React, { useContext } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LoggedInContext } from '../../App';


function UserNav() {

    const isLoggedIn = useContext(LoggedInContext);

    let history = useHistory();

    function authorize() {
        if (!isLoggedIn) {
            history.push("/home");
        } else {
            return;
        }
    };

    authorize();

    return (
        <div className="navbar">
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/game_nights" exact className={useLocation().pathname === "/game_nights" ? "navlink navlink-active" : "navlink"}>Game Nights</NavLink>
            <NavLink to="/friends" exact className={useLocation().pathname === "/friends" ? "navlink navlink-active" : "navlink"}>Friends</NavLink>
            <NavLink to="/profile" exact className={useLocation().pathname === "/profile" ? "navlink navlink-active" : "navlink"}>Profile</NavLink>
        </div>
    );
};

export default UserNav;