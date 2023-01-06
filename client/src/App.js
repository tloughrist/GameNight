import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Banner from "./Components/Banner/Banner.js";
import Friends from "./Components/Friends/Friends.js";
import GameNights from "./Components/GameNights/GameNights.js";
import Games from "./Components/Games/Games.js";
import Login from "./Components/Logging/Login.js";
import Logout from "./Components/Logging/Logout.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Profile.js";
import Users from "./Components/Users/Users.js";
import Home from "./Components/Home/Home.js";
import Messages from "./Components/Messages/Messages.js"

function App() {

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [friends, setFriends] = useState([]);
  const [friendsLoaded, setFriendsLoaded] = useState(false);
  const [gameNights, setGameNights] = useState([]);
  const [gameNightsLoaded, setGameNightsLoaded] = useState([]);
  const [games, setGames] = useState([]);
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  let history = useHistory();

  //Check to see if a user is logged in
  useEffect(() => { 
    fetchUser();
  }, []);

  useEffect(() => {
    if(!isInitialRender) {
      fetchFriends();
      fetchGameNights();
      fetchGames();
    } else {
      setIsInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  async function fetchUser() {
    const response = await fetch("/me");
    if (response.ok) {
      const user = await response.json();
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUserLoaded(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  async function fetchFriends() {
    const response = await fetch(`/friends/${currentUser.id}`);
    if (response.ok) {
      const frnds = await response.json();
      setFriends(frnds);
      setFriendsLoaded(true);
    }
  };

  async function fetchGameNights() {
    const response = await fetch(`users/game_nights/${currentUser.id}`);
    if (response.ok) {
      const ngts = await response.json();
      setGameNights(ngts);
      setGameNightsLoaded(true);
    }
  };

  async function fetchGames() {
    const response = await fetch(`users/${currentUser.id}/games/`);
    if (response.ok) {
        const gmes = await response.json();
        setGames(gmes);
        setGamesLoaded(true);
    }
};
  
  function onLogin(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    history.push("/home");
  };

  function logout() {
    history.push("/home");
    setCurrentUser();
    setIsLoggedIn(false);
  };

  async function userSearch(string) {
    const response = await fetch("user/search?" + new URLSearchParams({ query: string }).toString());
    if (response.ok) {
      const users = await response.json();
      setSearchedUsers(users);
    }
    history.push("/users");
  };

  return (
    <div className="App">
      <Banner
        userLoaded={userLoaded}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <Switch>
        <Route path="/messages">
          <Messages 
            //userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            //friends={friends}
            //gameNights={gameNights}
            //friendsLoaded={friendsLoaded}
            //fetchFriends={fetchFriends}
          />
        </Route>
        <Route path="/friends">
          <Friends 
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            gameNights={gameNights}
            friendsLoaded={friendsLoaded}
            fetchFriends={fetchFriends}
            search={userSearch}
          />
        </Route>
        <Route path="/game_nights">
          <GameNights
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            gameNights={gameNights}
            games={games}
          />
        </Route>
        <Route path="/games">
          <Games
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            games={games}
          />
        </Route>
        <Route path="/login">
          <Login 
            userLoaded={userLoaded}
            onLogin={onLogin}
          />
        </Route>
        <Route path="/logout">
          <Logout 
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route path="/signup">
          <Signup 
            onLogin={onLogin}
          />
        </Route>
        <Route path="/profile">
          <Profile 
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            logout={logout}
          />
        </Route>
        <Route path="/users">
          <Users 
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            searchedUsers={searchedUsers}
          />
        </Route>
        <Route path="/">
            <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
