import './App.css';
import React, { useState, useEffect, createContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Banner from "./Components/Banner/Banner.js";
import Friends from "./Components/Friends/Friends.js";
import GameNights from "./Components/GameNights/GameNights.js";
import Login from "./Components/Logging/Login.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Profile.js";
import Users from "./Components/Users/Users.js";
import Home from "./Components/Home/Home.js";

const CurrentUserContext = createContext();
const FriendsContext = createContext();
const LoggedInContext = createContext();

export { CurrentUserContext, FriendsContext, LoggedInContext };

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState("unchecked");
  const [logNav, setLogNav] = useState(false);
  const [friends, setFriends] = useState([]);
  const [gameNights, setGameNights] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/me");
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setIsLoggedIn(true);
        fetchFriends(user.id);
        fetchGameNights(user.id);
      } else {
        setIsLoggedIn(false);
      }
    }; 
    fetchData();
  }, [logNav]);

  async function fetchFriends(id) {
    const response = await fetch(`users/${id}/friends`);
    if (response.ok) {
      const frnds = await response.json();
      setFriends(frnds);
    }
  };

  async function fetchGameNights(userId) {
    const response = await fetch(`/game_nights/${userId}`);
    if (response.ok) {
      const ngts = await response.json();
      setGameNights(ngts);
    } else {
      alert(response.errors);
    }
  };
  
  function onLogin(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setLogNav(true);
    history.push("/home");
  };

  function logout() {
    history.push("/home");
    setCurrentUser();
    setFriends([]);
    setGameNights([]);
    setSearchedUsers([]);
    setIsLoggedIn(false);
  };

  async function userSearch(id, string) {
    const response = await fetch(`users/${id}/search?` + new URLSearchParams({ query: string }).toString());
    if (response.ok) {
      const users = await response.json();
      setSearchedUsers(users);
    }
    history.push("/users");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={isLoggedIn}>
        <FriendsContext.Provider value={friends}>
            <div className="App">
              <Banner />
              <Switch>
                <Route path="/friends">
                  <Friends 
                    search={userSearch}
                    setFriends={setFriends}
                  />
                </Route>
                <Route path="/game_nights">
                  <GameNights
                    gameNights={gameNights}
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
                    setCurrentUser={setCurrentUser}
                    logout={logout}
                  />
                </Route>
                <Route path="/users">
                  <Users 
                    searchedUsers={searchedUsers}
                  />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
              </Switch>
            </div>
        </FriendsContext.Provider>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;