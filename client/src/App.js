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

  const [userLoaded, setUserLoaded] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [friends, setFriends] = useState();
  const [gameNights, setGameNights] = useState();
  const [games, setGames] = useState();
  const [searchedUsers, setSearchedUsers] = useState();

  let history = useHistory();

  //Check to see if a user is logged in
  useEffect(() => {
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
    fetchUser();
  }, []);
  
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

  async function search(string) {
    const response = await fetch("/search?" + new URLSearchParams({ query: string }).toString());
    if (response.ok) {
      const users = await response.json();
      setSearchedUsers(users);
      console.log(users);
    }
    history.push("/users");
  };


  return (
    <div className="App">
      <Banner
        userLoaded={userLoaded}
        isLoggedIn={isLoggedIn}
        logout={logout}
        search={search}
      />
      <Switch>
        <Route path="/friends">
          <Friends 
            userLoaded={userLoaded}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            friends={friends}
            gameNights={gameNights}
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
