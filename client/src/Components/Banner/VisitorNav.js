import './Banner.css';
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function VisitorNav() {
    return (
        <div className="navbar">
            <NavLink to="/" exact className={useLocation().pathname === "/" ? "navlink navlink-active" : "navlink"}>home</NavLink>
            <NavLink to="/login" exact className={useLocation().pathname === "/login" ? "navlink navlink-active" : "navlink"}>login</NavLink>
            <NavLink to="/signup" exact className={useLocation().pathname === "/signup" ? "navlink navlink-active" : "navlink"}>signup</NavLink>
        </div>
    );
};

export default VisitorNav;