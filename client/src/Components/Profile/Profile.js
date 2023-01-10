import './Profile.css';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToggle } from "../../CustomHooks/Toggle.js";

let display = <p>Loading...</p>;

function Profile({isLoggedIn, currentUser, setCurrentUser, logout}) {
    
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [dob, setDob] = useState("");
    const [blurb, setBlurb] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [passwordValidity, setPasswordValidity] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isToggled, toggle] = useToggle(false);
    
    let history = useHistory();

    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            }
        } else {
            setIsInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    useEffect(() => {
        if (currentUser) {
            setStates();
        }
    }, [currentUser]);

    useEffect(() => {
        if (!isInitialRender) {
            setStates();
        } else {
            setIsInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    function setStates() {
        setName(currentUser.name);
        setDob(currentUser.dob);
        setBlurb(currentUser.blurb);
        setEmail(currentUser.email);
        setPronouns(currentUser.pronouns);
    };

    async function handleLogout() {
        await fetch("/logout", {
          method: "DELETE"
        });
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

    async function handleProfileChange(e) {
        e.preventDefault();
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
            alert(user.errors);
        } else {
            console.log(user);
            setCurrentUser(user);
        }
    };

    async function handlePasswordChange(e) {
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
    };

    useEffect(() => {
        if (name.length > 0) {
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
                            onChange={(e) => setName(e.target.value)}
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
            toggle();
        }
    }, [name, email, dob, pronouns, blurb, password, passwordConfirmation]);
    
    return (
        <div className="display-container">
            {display}
        </div>
    );
};

export default Profile;