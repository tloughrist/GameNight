import './Users.css';
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserCard from "./UserCard.js";
import { LoggedInContext } from '../../App';

function Users({ searchedUsers }) {

    const isLoggedIn = useContext(LoggedInContext);

    let history = useHistory();
        
    return (
        isLoggedIn !== false?
            <div className="user-container">
                {
                    searchedUsers.length > 0?
                        <div className="users">
                            {searchedUsers.map((user) =>
                                <UserCard
                                    key={`user${user.user.id}`}
                                    user={user}
                                />
                            )}
                        </div>
                    :   <h2>No users loaded.</h2>
                }
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default Users;