import './Banner.css';
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function VisitorNav() {
    return (
        <div className="navbar">
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/login" exact className={useLocation().pathname === "/login" ? "navlink navlink-active" : "navlink"}>Login</NavLink>
            <NavLink to="/signup" exact className={useLocation().pathname === "/signup" ? "navlink navlink-active" : "navlink"}>Signup</NavLink>
        </div>
    );
};

export default VisitorNav;