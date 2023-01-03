import React from "react";
import { useHistory } from "react-router-dom";

function Logout({ isLoggedIn }) {

    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>You have been logged out!</p>
        </div>
    );
};

export default Logout;