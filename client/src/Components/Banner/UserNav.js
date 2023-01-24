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
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>home</NavLink>
            <NavLink to="/game_nights" exact className={useLocation().pathname === "/game_nights" ? "navlink navlink-active" : "navlink"}>game nights</NavLink>
            <NavLink to="/friends" exact className={useLocation().pathname === "/friends" ? "navlink navlink-active" : "navlink"}>friends</NavLink>
            <NavLink to="/profile" exact className={useLocation().pathname === "/profile" ? "navlink navlink-active" : "navlink"}>profile</NavLink>
        </div>
    );
};

export default UserNav;