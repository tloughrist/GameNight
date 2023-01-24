import './Friends.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard.js";
import FriendCard from "./FriendCard.js";
import { LoggedInContext, CurrentUserContext, FriendsContext } from '../../App';
 
function Friends({search, setFriends}) {
    
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);
    const friends = useContext(FriendsContext);
    const currentUser = useContext(CurrentUserContext);

    let history = useHistory();

    useEffect(() => {
        if (currentUser) {
            fetchFriendRequests(currentUser.id);
        }
    }, [currentUser, isLoggedIn, friends])

    async function fetchFriendRequests(id) {
        const response = await fetch(`/users/${id}/friend_requests`);
        if (response.ok) {
          const requests = await response.json();
          setFriendRequests(requests);
          setIsLoaded(true);
        }
    };
    
    return (
        isLoggedIn !== false?
            <div className="friend-container">
                <div>
                    <h2>find users</h2>
                    <input
                        type="text"
                        placeholder="Search by username.."
                        value={searchString}
                        className="search"
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button onClick={(e) => search(currentUser.id,searchString)} className="navlink">search for users</button>
                </div>
                <div>
                    <h2>friend requests</h2>
                    {
                        isLoaded?
                            friendRequests.length > 0 ?
                                <div id="requests">
                                    {friendRequests.map((request) =>
                                        <FriendRequestCard
                                            key={`request${request.id}`}
                                            request={request}
                                            friendRequests={friendRequests}
                                            setFriendRequests={setFriendRequests}
                                            setFriends={setFriends}
                                        />
                                    )}
                                </div>
                            :   <div>
                                    <p>no friend requests at this time</p>
                                </div>
                        :   <div>
                                <p>loading...</p>
                            </div>
                    }
                </div>
                <div>
                    <h2>friends</h2>
                    {
                        friends.length > 0 ?
                            <div id="friends">
                                {friends.map((friend) =>
                                    <FriendCard
                                        key={`friend${friend.id}`}
                                        friend={friend}
                                        setFriends={setFriends}
                                    />
                                )}
                            </div>
                        : <div>
                            <p>no friends at this time</p>
                        </div>
                    }
                </div>
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default Friends;