import './Banner.css';
import React, { useContext } from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";
import { LoggedInContext } from '../../App';

function Banner() {

    const isLoggedIn = useContext(LoggedInContext);

    return (
        <div className="display-container">
            <img id="banner_img" src="./gamenight_logo.png" alt="Gamenight" />
            {
                isLoggedIn !== false?
                    <UserNav />
                :   <VisitorNav />
            }
        </div>
    );
};

export default Banner;