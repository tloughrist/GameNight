import './Profile.css';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

let display = <p>Loading...</p>;

function Profile({userLoaded, isLoggedIn, currentUser, setCurrentUser, logout}) {
    
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [dob, setDob] = useState("");
    const [blurb, setBlurb] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [validity, setValidity] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    
    let history = useHistory();

    function setStates() {
        setName(currentUser.name);
        setDob(currentUser.dob);
        setBlurb(currentUser.blurb);
        setEmail(currentUser.email);
        setPronouns(currentUser.pronouns);
    };

    useEffect(() => {
        if (isLoggedIn) {
            setStates();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            } else {
                setStates();
            }
        } else {
            setIsInitialRender(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    async function handleLogout() {
        await fetch("/logout", {
          method: "DELETE"
        });
        alert("You have been logged out.");
        logout();
    };

    async function handleDelete() {
        if (window.confirm("Are you sure you want to delete your account?")) {
            await fetch(`/users/${currentUser.id}`, {
                method: "DELETE"
            });
            alert("Your account has been deleted.")
            logout();
        }
    };

    function checkValidity() {
        if (name.length > 1 && email.length > 4 && blurb.length < 501 && dob.length > 0) {
            setValidity(true)
        }
    };

    async function handleProfileChange(e) {
        e.preventDefault();
        checkValidity();
        console.log(blurb.length)
        if (validity) {
            const res = await fetch(`/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name,
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
                setCurrentUser(user);
              }
        } else {
            alert("Invalid - check entries")
        }
    };

    function checkPasswordValidity() {
        if (password.length > 7 && password === passwordConfirmation) {
            setPasswordValidity(true)
        }
    };

    async function handlePasswordChange(e) {
        e.preventDefault();
        checkPasswordValidity();
        if (passwordValidity) {
            const res = await fetch(`/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    password
                 }),
              });
              const user = await res.json();
              if (user.errors) {
                alert(user.errors)
              } else {
                console.log(user);
                setCurrentUser(user);
              }
        } else {
            alert("Invalid - check entries")
        }
    };

    if (userLoaded) {
        display = (
            <>
                <form onSubmit={handleProfileChange}>
                    <h3>Change Profile</h3>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={name}    
                        placeholder={`${currentUser.name}`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder={`${currentUser.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="dob">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={dob}
                        placeholder={`${currentUser.dob}`}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <label htmlFor="pronouns">
                        Preferred pronouns - optional
                    </label>
                    <input
                        type="text"
                        name="pronouns"
                        value={pronouns}
                        placeholder={`${currentUser.pronouns}`}
                        onChange={(e) => setPronouns(e.target.value)}
                    />
                    <label htmlFor="blurb">
                        Write something about yourself in 500 characters or less - optional
                    </label>
                    <textarea
                        name="blurb"
                        value={blurb}
                        placeholder={`${currentUser.blurb}`}
                        onChange={(e) => setBlurb(e.target.value)}
                    />
                    <input
                        type="submit"
                    />
                </form>
                <form onSubmit={handlePasswordChange}>
                <h3>Change Password</h3>
                    <input
                        type="text"
                        className="hidden"
                        autoComplete="username"
                    />
                    <label htmlFor="password">
                        New password - Must be at least eight characters long
                    </label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="passwordConfirmation">
                        Confirm new password
                    </label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        autoComplete="new-password-confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <input
                        type="submit"
                    />
                </form>
                <h3>Manage Account</h3>
                <button onClick={e => handleLogout()} className="navlink">Logout</button>
                <button onClick={e => handleDelete()} className="navlink">Delete Account</button>
            </>
        );
    }

    return (
        <div className="display-container">
            {display}
        </div>
    );
};

export default Profile;