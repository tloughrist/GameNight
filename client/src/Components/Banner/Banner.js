import React from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";

let bannerDisplay = <p>Loading...</p>

function Banner({isLoaded, isLoggedIn, logout}) {

    if (isLoaded) {
        if (isLoggedIn) {
            bannerDisplay = <UserNav logout={logout} />
        } else {
            bannerDisplay = <VisitorNav />;
        }
    }

    return (
        <div className="display-container">
            <img src="./gamenight_logo.png" />
            {bannerDisplay}
        </div>
    );
};

export default Banner;