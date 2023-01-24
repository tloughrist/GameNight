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
            <div className="container">
                {
                    isLoaded?
                        <>
                            <div className="brand-logo"></div>
                            <div className="side-by-side_container">
                                <div className="side-by-side_element">
                                    <h3>change profile</h3>
                                    <form onSubmit={handleProfileChange}>
                                        <label htmlFor="name">
                                            name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <label htmlFor="email">
                                            email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div className="side-by-side_container">
                                            <div className="side-by-side_element">
                                                <label htmlFor="dob">
                                                    dob
                                                </label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                />
                                            </div>
                                            <div className="side-by-side_element">
                                                <label htmlFor="pronouns">
                                                    pronouns
                                                </label>
                                                <input
                                                    type="text"
                                                    name="pronouns"
                                                    value={pronouns}
                                                    onChange={(e) => setPronouns(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="blurb">
                                            <p>blurb</p>
                                            <p className="subtext">(500 character maximum)</p>
                                        </label>
                                        <textarea
                                            name="blurb"
                                            value={blurb}
                                            onChange={(e) => setBlurb(e.target.value)}
                                        />
                                        <input
                                            type="submit"
                                            value="submit profile"
                                            className="navlink"
                                        />
                                    </form>
                                </div>
                                <div className="side-by-side_element">
                                    <h3>change password</h3>
                                    <form onSubmit={handlePasswordChange}>
                                        <input
                                            type="text"
                                            className="hidden"
                                            autoComplete="username"
                                        />
                                        <label htmlFor="password">
                                            <p>new password</p>
                                            <p className="subtext">(eight character minimum)</p>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="passwordConfirmation">
                                            confirm new password
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
                                            value="submit password"
                                            className="navlink"
                                        />
                                    </form>
                                    <div>
                                        <h3>manage account</h3>
                                        <button onClick={e => handleLogout()} className="navlink">logout</button>
                                        <button onClick={e => handleDelete()} className="navlink">delete account</button>
                                    </div>
                                </div>
                            </div>
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