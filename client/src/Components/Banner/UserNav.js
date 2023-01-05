import React, { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";

function UserNav({ search, isLoggedIn }) {

    const [searchString, setSearchString] = useState("");
    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="navbar">
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/game_nights" exact className={useLocation().pathname === "/game_nights" ? "navlink navlink-active" : "navlink"}>Game Nights</NavLink>
            <NavLink to="/games" exact className={useLocation().pathname === "/games" ? "navlink navlink-active" : "navlink"}>Games</NavLink>
            <NavLink to="/friends" exact className={useLocation().pathname === "/friends" ? "navlink navlink-active" : "navlink"}>Friends</NavLink>
            <NavLink to="/profile" exact className={useLocation().pathname === "/profile" ? "navlink navlink-active" : "navlink"}>Profile</NavLink>
            <div>
                <input
                    type="text"
                    placeholder="Search by username.."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button onClick={(e) => search(searchString)} className="navlink">Search</button>
            </div>
        </div>
    );
};

export default UserNav;