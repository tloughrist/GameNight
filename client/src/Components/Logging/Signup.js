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
    const [validity, setValidity] = useState(false);

    function checkValidity() {
        if (name.length > 1 && username.length > 5 && password.length > 7 && password === passwordConfirmation && email.length > 4 && blurb.length < 501 && dob.length > 0) {
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">
            Password - Must be at least eight characters long
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirmation">
            Confirm password
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            autoComplete="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <label htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <label htmlFor="pronouns">
            Preferred pronouns - optional
          </label>
          <input
            type="text"
            name="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
          />
          <label htmlFor="blurb">
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