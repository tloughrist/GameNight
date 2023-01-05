import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessageCard from "./MessageCard.js";

let messageDisplay = <h2>Loading...</h2>

function Messages({ isLoggedIn, currentUser, userLoaded }) {
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [messageDisplayed, setMessageDisplayed] = useState(false);
    
  let history = useHistory();

  useEffect(() => {
      if (!isInitialRender) {
          if (!isLoggedIn) {
            history.push("/home");
          } else {
            fetchMessages();
          }
      } else {
          setIsInitialRender(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    messageDisplay = 
      <div>
          <h3>Messages</h3>
          {messages.map((message) =>
              <MessageCard
                key={`message${message.id}`}
                message={message}
                messagesLoaded={messagesLoaded}
              />
          )}
      </div>;
    setMessageDisplayed(true);
  }, [messagesLoaded]);

  async function fetchMessages() {
    const response = await fetch(`users/${currentUser.id}/messages/`);
    if (response.ok) {
      const msges = await response.json();
      setMessages(msges);
      setMessagesLoaded(true);
    }
  };

  return (
      <div className="display-container">
          {messageDisplay}
      </div>
  );
};

export default Messages;