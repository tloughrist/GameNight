import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserCard from "./UserCard.js";
import { LoggedInContext, CurrentUserContext, FriendsContext } from '../../App';

let display = <h2>No users loaded.</h2> 

function Users({ searchedUsers }) {

    const [isInitialRender, setIsInitialRender] = useState(true);

    const isLoggedIn = useContext(LoggedInContext);
    const friends = useContext(FriendsContext);
    const currentUser = useContext(CurrentUserContext);

    let history = useHistory();

    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            }
        } else {
            setIsInitialRender(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (searchedUsers.length > 0) {
            display =
            <>
                {searchedUsers.map((user) =>
                    <UserCard
                        key={`user${user.id}`}
                        user={user}
                    />
                )}
            </>;
        }
    }, [searchedUsers])
        
    return (
        <div className="display-container">
            {display}
        </div>
    );
};

export default Users;