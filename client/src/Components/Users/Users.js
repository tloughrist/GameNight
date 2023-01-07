import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserCard from "./UserCard.js";

let display = <h2>No users loaded.</h2> 

function Users({userLoaded, isLoggedIn, currentUser, friends, searchedUsers}) {

    const [isInitialRender, setIsInitialRender] = useState(true);

    let history = useHistory();

    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            }
        } else {
            setIsInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    useEffect(() => {
        if (searchedUsers.length > 0) {
            display =
            <>
                {searchedUsers.map((user) =>
                    <UserCard
                        key={`user${user.id}`}
                        currentUser={currentUser}
                        user={user}
                        friends={friends}
                    />
                )}
            </>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedUsers])
        
    return (
        <div className="display-container">
            {display}
        </div>
    );
};

export default Users;