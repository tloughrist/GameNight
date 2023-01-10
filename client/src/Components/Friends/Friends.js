import './Friends.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard.js";
import FriendCard from "./FriendCard.js";
import { useToggle } from "../../CustomHooks/Toggle.js";
import { LoggedInContext, CurrentUserContext, FriendsContext } from '../../App';

let requestDisplay = <p>Loading...</p>
let friendDisplay = <p>Loading...</p>

function Friends({fetchFriends, gameNights, search}) {
    
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [isToggled, toggle] = useToggle(false);

    const isLoggedIn = useContext(LoggedInContext);
    const friends = useContext(FriendsContext);
    const currentUser = useContext(CurrentUserContext);

    let history = useHistory();

    //Allow only logged-in users access
    useEffect(() => {
        function authorize(){
            if (isLoggedIn !== "unchecked") {
                if (!isLoggedIn) {
                    history.push("/home");
                }
            }
        };
        authorize();
    }, [isLoggedIn, history]);

    //Handle loading through navigation
    useEffect(() => {
        if (currentUser !== "unchecked") {
            if (currentUser) {
                fetchFriendRequests();
            }
        } 
    }, [currentUser])

    //Handle loading through refresh
    // useEffect(() => {
    //     if (!isInitialRender) {
    //         fetchFriendRequests();
    //     } else {
    //         setIsInitialRender(false);
    //     }
    // }, [currentUser]);

    useEffect(() => {
        if (friendRequests.length > 0) {
            requestDisplay =
                <div>
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
                </div>;
        } else {
            requestDisplay = 
                <div>
                    <p>No friend requests at this time.</p>
                </div>;
        }
        toggle();
    }, [friendRequests]);

    useEffect(() => {
        function switchDisplay(){
            if (friends.length > 0) {
                friendDisplay =
                    <div>
                        {friends.map((friend) =>
                            <FriendCard
                                key={`friend${friend.id}`}
                                currentUser={currentUser}
                                friend={friend}
                                fetchFriends={fetchFriends}
                                gameNights={gameNights}
                            />
                        )}
                    </div>
            } else {
                friendDisplay = 
                    <div>
                        <p>No friends at this time.</p>
                    </div>;
            }
            toggle();
        };
        switchDisplay();
    }, [friends]);

    async function fetchFriendRequests() {
        const response = await fetch(`/friend_requests/${currentUser.id}`);
        if (response.ok) {
          const requests = await response.json();
          setFriendRequests(requests);
          setRequestsLoaded(true);
        }
    };

    return (
        <div className="display-container">
            <div>
                <h3>Find Users</h3>
                <input
                    type="text"
                    placeholder="Search by username.."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button onClick={(e) => search(searchString)} className="navlink">Search for Users</button>
            </div>
            <div>
                <h3>Friend Requests</h3>
                {requestDisplay}
            </div>
            <div>
                <h3>Friends</h3>
                {friendDisplay}
            </div>
        </div>
    );
};

export default Friends;