import React from "react";
import UserNav from "./UserNav.js";
import VisitorNav from "./VisitorNav.js";

let bannerDisplay = <p>Loading...</p>

function Banner({isLoaded, isLoggedIn, search}) {

    if (isLoaded) {
        if (isLoggedIn) {
            bannerDisplay = <UserNav search={search} />
        } else {
            bannerDisplay = <VisitorNav />;
        }
    }

    return (
        <div className="display-container">
            <img src="./gamenight_logo.png" alt="Gamenight" />
            {bannerDisplay}
        </div>
    );
};

export default Banner;