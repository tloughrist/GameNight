import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function UserNav({ logout }) {
    return (
        <div className="navbar">
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/game_nights" exact className={useLocation().pathname === "/game_nights" ? "navlink navlink-active" : "navlink"}>Game Nights</NavLink>
            <NavLink to="/games" exact className={useLocation().pathname === "/games" ? "navlink navlink-active" : "navlink"}>Games</NavLink>
            <NavLink to="/friends" exact className={useLocation().pathname === "/friends" ? "navlink navlink-active" : "navlink"}>Friends</NavLink>
            <NavLink to="/profile" exact className={useLocation().pathname === "/profile" ? "navlink navlink-active" : "navlink"}>Profile</NavLink>
            <button onClick={e => logout()} className="navlink">Logout</button>
        </div>
    );
};

export default UserNav;