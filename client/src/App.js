import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Banner from "./Components/Banner/Banner.js";
import Friends from "./Components/Friends/Friends.js";
import GameNights from "./Components/GameNights/GameNights.js";
import Games from "./Components/Games/Games.js";
import Login from "./Components/Logging/Login.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Profile.js";
import Users from "./Components/Users/Users.js";
import Home from "./Components/Home/Home.js";
import Messages from "./Components/Messages/Messages.js"
import { useToggle } from "./CustomHooks/Toggle.js";

let appDisplay = <h3>Loading...</h3>

function App() {

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [friends, setFriends] = useState([]);
  const [gameNights, setGameNights] = useState([]);
  const [games, setGames] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isToggled, toggle] = useToggle(false);

  let history = useHistory();

  //Check to see if a user is logged in
  useEffect(() => { 
    fetchUser();
  }, []);

  //Handle loading through navigation
  useEffect(() => {
    if (currentUser) {
      fetchFriends();
      fetchGameNights();
      fetchGames();
    }
    changeDisplay();
  }, [currentUser])

  useEffect(() => {
    if(!isInitialRender && isLoggedIn) {
      fetchFriends();
      fetchGameNights();
      fetchGames();
    } else {
      setIsInitialRender(false);
    }
    changeDisplay();
  }, [isLoggedIn, isInitialRender])

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
    }
  };

  async function fetchGameNights() {
    const response = await fetch(`users/game_nights/${currentUser.id}`);
    if (response.ok) {
      const ngts = await response.json();
      setGameNights(ngts);
    }
  };

  async function fetchGames() {
    const response = await fetch(`users/${currentUser.id}/games/`);
    if (response.ok) {
        const gmes = await response.json();
        setGames(gmes);
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
    setFriends([]);
    setGameNights([]);
    setGames([]);
    setSearchedUsers([]);
    setIsLoggedIn(false);
    setUserLoaded(false);
  };

  async function userSearch(string) {
    const response = await fetch("user/search?" + new URLSearchParams({ query: string }).toString());
    if (response.ok) {
      const users = await response.json();
      setSearchedUsers(users);
    }
    history.push("/users");
  };

  function changeDisplay() {
    appDisplay = 
      <div className="App">
        <Banner
          isLoggedIn={isLoggedIn}
          logout={logout}
        />
        <Switch>
          <Route path="/messages">
            <Messages 
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          </Route>
          <Route path="/friends">
            <Friends 
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              friends={friends}
              gameNights={gameNights}
              fetchFriends={fetchFriends}
              search={userSearch}
            />
          </Route>
          <Route path="/game_nights">
            <GameNights
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              friends={friends}
              gameNights={gameNights}
              fetchGameNights={fetchGameNights}
              games={games}
            />
          </Route>
          <Route path="/games">
            <Games
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              friends={friends}
              games={games}
            />
          </Route>
          <Route path="/login">
            <Login 
              onLogin={onLogin}
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
      </div>;
    toggle();
  };

  return (
    <div>
      {appDisplay}
    </div>
  );
}

export default App;
