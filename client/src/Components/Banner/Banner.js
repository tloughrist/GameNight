import './Banner.css';
import React, { useContext } from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";
import { LoggedInContext } from '../../App';

let bannerDisplay = <p>Loading...</p>

function Banner() {

    const isLoggedIn = useContext(LoggedInContext);

    function displaySwitch() {
        if (isLoggedIn) {
            bannerDisplay = <UserNav />;
        } else {
            bannerDisplay = <VisitorNav />;
        }
    };
    
    displaySwitch();

    return (
        <div className="display-container">
            <img id="banner_img" src="./gamenight_logo.png" alt="Gamenight" />
            {bannerDisplay}
        </div>
    );
};

export default Banner;