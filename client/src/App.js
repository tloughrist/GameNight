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
  return (
    <div className="App">
      <Banner />
      <Switch>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/game_nights">
          <GameNights />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
            <Home
            />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
