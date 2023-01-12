import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import MessageCard from "./MessageCard.js";
import { LoggedInContext, CurrentUserContext } from '../../App';

function Messages() {
  
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useContext(LoggedInContext);
  const currentUser = useContext(CurrentUserContext);

  let history = useHistory();

  useEffect(() => {
    if (currentUser) {
      fetchMessages(currentUser.id);
    }
  }, [currentUser])

  async function fetchMessages(id) {
    const response = await fetch(`users/${id}/messages/`);
    if (response.ok) {
      const msges = await response.json();
      setMessages(msges);
      setIsLoaded(true);
    }
  };

  return (
    isLoggedIn !== false?
      <div className="display-container">
        {
          isLoaded?
              messages.length > 0?
                <>
                  <h3>Messages</h3>
                    {messages.map((message) =>
                      <MessageCard
                        key={`message${message.id}`}
                        message={message}
                      />
                    )}
                </>
              : <>
                  <h3>No Messages at this time.</h3>
                </>
          : <p>Loading...</p>
        }
      </div>
    : <div>
          {history.push("/home")}
      </div>
  );
};

export default Messages;