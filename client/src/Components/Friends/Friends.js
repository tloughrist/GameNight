import './Friends.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard.js";
import FriendCard from "./FriendCard.js";
import { LoggedInContext, CurrentUserContext, FriendsContext } from '../../App';
 
function Friends({gameNights, search, setFriends}) {
    
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
    }, [currentUser])

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
            <div className="display-container">
                <div>
                    <h3>Find Users</h3>
                    <input
                        type="text"
                        placeholder="Search by username.."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button onClick={(e) => search(currentUser.id,searchString)} className="navlink">Search for Users</button>
                </div>
                <div>
                    <h3>Friend Requests</h3>
                    {
                        isLoaded?
                            friendRequests.length > 0 ?
                                <div>
                                    {friendRequests.map((request) =>
                                        <FriendRequestCard
                                            key={`request${request.id}`}
                                            request={request}
                                            fetchFriendRequests={fetchFriendRequests}
                                            setFriends={setFriends}
                                        />
                                    )}
                                </div>
                            :   <div>
                                    <p>No friend requests at this time.</p>
                                </div>
                        :   <div>
                                <p>Loading...</p>
                            </div>
                    }
                </div>
                <div>
                    <h3>Friends</h3>
                    {
                        friends.length > 0 ?
                            <div>
                                {friends.map((friend) =>
                                    <FriendCard
                                        key={`friend${friend.id}`}
                                        friend={friend}
                                        setFriends={setFriends}
                                        gameNights={gameNights}
                                    />
                                )}
                            </div>
                        : <div>
                            <p>No friends at this time.</p>
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