import React, { useState } from "react";

function Signup({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [dob, setDob] = useState("");
    const [blurb, setBlurb] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [validity, setValidity] = useState(false);

    function checkValidity() {
        if (username.length > 5 && password.length > 7 && password == passwordConfirmation && email.length > 4 && blurb.length < 501 && dob.length > 0) {
            setValidity(true)
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        checkValidity();
        if (validity) {
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username,
                    password,
                    email,
                    dob,
                    pronouns,
                    blurb,
                 }),
              });
              const user = res.json();
              onLogin(user);
        } else {
            alert("Invalid - check entries")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <label for="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="password">
            Password - Must be at least eight characters long
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="passwordConfirmation">
            Confirm password
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <label for="email">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="dob">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <label for="pronouns">
            Preferred pronouns - optional
          </label>
          <input
            type="text"
            name="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
          />
          <label for="blurb">
            Write something about yourself in 500 characters or less - optional
          </label>
          <textarea
            name="blurb"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
    );
};

export default Signup;