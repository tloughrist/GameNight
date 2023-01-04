import React from "react";
import { useHistory } from "react-router-dom";

function Users({userLoaded, isLoggedIn, currentUser, friends, searchedUsers}) {

    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>Users</p>
        </div>
    );
};

export default Users;