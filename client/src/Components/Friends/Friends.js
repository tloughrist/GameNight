import './Friends.css';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard.js";
import FriendCard from "./FriendCard.js";

let display = <p>Loading...</p>;
let requestDisplay =
    <div>
        <h3>Friend Requests</h3>
        <p>None at this time.</p>
    </div>
let friendDisplay =
    <div>
        <h3>Friends</h3>
        <p>None at this time.</p>
    </div>

function Friends({userLoaded, isLoggedIn, currentUser, friends, friendsLoaded, fetchFriends, gameNights, search}) {
    
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [searchString, setSearchString] = useState("");

    let history = useHistory();

    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            } else {
                fetchFriendRequests();
            }
        } else {
            setIsInitialRender(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    async function fetchFriendRequests() {
        const response = await fetch(`/friend_requests/${currentUser.id}`);
        if (response.ok) {
          const requests = await response.json();
          setFriendRequests(requests);
          setRequestsLoaded(true);
        }
    };
    
    if (userLoaded && friendRequests.length > 0) {
        requestDisplay =
        <div>
            <h3>Friend Requests</h3>
            {friendRequests.map((request) =>
                <FriendRequestCard
                    key={`request${request.id}`}
                    currentUser={currentUser}
                    request={request}
                    requestsLoaded={requestsLoaded}
                    fetchFriendRequests={fetchFriendRequests}
                    fetchFriends={fetchFriends}
                />
            )}
        </div>
    }

    if (userLoaded && friends.length > 0) {
        friendDisplay =
        <div>
            <h3>Friends</h3>
            {friends.map((friend) =>
                <FriendCard
                    key={`friend${friend.id}`}
                    currentUser={currentUser}
                    friend={friend}
                    friendsLoaded={friendsLoaded}
                    fetchFriends={fetchFriends}
                />
            )}
        </div>
    }

    if (userLoaded) {
        display =
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by username.."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button onClick={(e) => search(searchString)} className="navlink">Search for Users</button>
            </div>
            {requestDisplay}
            {friendDisplay}
        </div>
    }

    return (
        <div className="display-container">
            {display}
        </div>

    );
};

export default Friends;