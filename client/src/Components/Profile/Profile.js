import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Profile({isLoaded, isLoggedIn, currentUser, logout}) {
    
    let history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) {
            history.push("/home");
        }
      }, []);

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

    return (
        <div className="display-container">
            <p>Profile</p>
            <button onClick={e => handleLogout()} className="navlink">Logout</button>
            <button onClick={e => handleDelete()} className="navlink">Delete Account</button>
        </div>
    );
};

export default Profile;