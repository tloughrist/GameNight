import '../../App.css';
import React, { useState } from "react";

function Signup({ onLogin }) {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [dob, setDob] = useState("");
    const [blurb, setBlurb] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.length > 1 && username.length > 4 && password.length > 7 && password === passwordConfirmation && email.length > 4 && blurb.length < 501 && dob.length > 0) {
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name,
                    username,
                    password,
                    email,
                    dob,
                    pronouns,
                    blurb,
                 }),
              });
              const user = await res.json();
              if (user.errors) {
                alert(user.errors)
              } else {
                console.log(user);
                onLogin(user)
              }
        } else {
            alert("Invalid - check entries")
        }
    }

    return (
      <div className="card" id="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            name
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            className="non_card_input"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">
            username
          </label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            className="non_card_input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">
            <p>password</p>
            <p className="subtext">must be at least eight characters long</p>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            className="non_card_input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirmation">
            confirm password
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            autoComplete="password-confirmation"
            value={passwordConfirmation}
            className="non_card_input"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <label htmlFor="email">
            email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="non_card_input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="dob">
            dob
          </label>
          <input
            type="date"
            name="dob"
            value={dob}
            className="non_card_input"
            onChange={(e) => setDob(e.target.value)}
          />
          <label htmlFor="pronouns">
            <p>preferred pronouns</p>
            <p className="subtext">(optional)</p>
          </label>
          <input
            type="text"
            name="pronouns"
            value={pronouns}
            className="non_card_input"
            onChange={(e) => setPronouns(e.target.value)}
          />
          <label htmlFor="blurb">
            <p>blurb</p>
            <p className="subtext">(500 character maximum, optional)</p>
          </label>
          <textarea
            name="blurb"
            value={blurb}
            className="non_card_input"
            onChange={(e) => setBlurb(e.target.value)}
          />
          <button className="navlink" type="submit">Submit</button>
        </form>
      </div>
    );
};

export default Signup;