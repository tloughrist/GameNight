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
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
    );
};

export default Login;