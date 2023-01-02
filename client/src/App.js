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

function App() {

  const [isLoaded, setIsLoaded] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState();
  const [gameNights, setGameNights] = useState();
  const [games, setGames] = useState()

  //useEffect to fetch user, friends, gamenights, games

  function onLogin(user) {
    console.log("Login");
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  function logout() {

  };

  function search() {

  };


  return (
    <div className="App">
      <Banner
        isLoaded={isLoaded}
        isLoggedIn={isLoggedIn}
        logout={logout}
        search={search}
      />
      <Switch>
        <Route path="/friends">
          <Friends 
            isLoaded={isLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            gameNights={gameNights}
          />
        </Route>
        <Route path="/game_nights">
          <GameNights
            isLoaded={isLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            gameNights={gameNights}
            games={games}
          />
        </Route>
        <Route path="/games">
          <Games
            isLoaded={isLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            games={games}
          />
        </Route>
        <Route path="/login">
          <Login 
          isLoaded={isLoaded}
          onLogin={onLogin}
          />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/profile">
          <Profile 
            isLoaded={isLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        </Route>
        <Route path="/users">
          <Users 
            isLoaded={isLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
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
