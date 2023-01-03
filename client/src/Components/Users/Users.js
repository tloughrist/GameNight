import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Users({isLoaded, isLoggedIn, currentUser, friends}) {

    const [searchedUsers, setSearchedUsers] = useState(null);

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