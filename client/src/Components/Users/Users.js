import React, { useState } from "react";

function Users({isLoaded, isLoggedIn, currentUser, friends}) {

    const [searchedUsers, setSearchedUsers] = useState(null);

    return (
        <div className="display-container">
            <p>Users</p>
        </div>
    );
};

export default Users;