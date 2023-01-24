import '../../App.css';
import React, { useState } from "react";

function Login({ onLogin }) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const user = await res.json();
      if (user.errors) {
        alert("Incorrect username/password");
      } else {
        onLogin(user);
      }
    };
    
    return (
      <div className="card" id="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            className="non_card_input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">
            password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="password"
            value={password}
            className="non_card_input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="navlink" type="submit">Login</button>
        </form>
      </div>
    );
};

export default Login;