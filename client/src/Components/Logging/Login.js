import React, { useState } from "react";

function Login({ isLoaded, onLogin}) {
    
    const [username, setUsername] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
        const user = res.json();
        onLogin(user);
    }
    
    return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
    );
};

export default Login;