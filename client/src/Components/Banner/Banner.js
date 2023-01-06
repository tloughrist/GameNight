import './Banner.css';
import React from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";

let bannerDisplay = <p>Loading...</p>

function Banner({userLoaded, isLoggedIn}) {

    if (isLoggedIn) {
        bannerDisplay = <UserNav isLoggedIn={isLoggedIn} />
    } else {
        bannerDisplay = <VisitorNav />;
    }

    return (
        <div className="display-container">
            <img id="banner_img" src="./gamenight_logo.png" alt="Gamenight" />
            {bannerDisplay}
        </div>
    );
};

export default Banner;