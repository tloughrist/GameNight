import React from "react";

function Users({
    isLoaded={isLoaded},
    isLoggedIn={isLoggedIn},
    currentUser={currentUser},
    friends={friends}
}) {

    const [searchedUsers, setSearchedUsers] = useState(null);

    return (
        <div className="display-container">
            <p>Users</p>
        </div>
    );
};

export default Users;