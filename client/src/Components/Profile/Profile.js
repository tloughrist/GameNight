import './Profile.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedInContext, CurrentUserContext } from '../../App';

function Profile({ setCurrentUser, logout }) {
    
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [dob, setDob] = useState("");
    const [blurb, setBlurb] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);
    const currentUser = useContext(CurrentUserContext);
    
    let history = useHistory();
    
    useEffect(() => {
        function setStates() {
            if (currentUser) {
                setName(currentUser.name);
                setDob(currentUser.dob);
                setBlurb(currentUser.blurb);
                setEmail(currentUser.email);
                setPronouns(currentUser.pronouns);
                setIsLoaded(true);
            }
        };
        setStates();
    }, [currentUser]) 

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

    return (
        isLoggedIn !== false?
            <div className="display-container">
                {
                    isLoaded?
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
                    :   <p>Loading...</p>
                }
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default Profile;