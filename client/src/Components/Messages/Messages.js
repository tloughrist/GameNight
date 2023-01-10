import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import MessageCard from "./MessageCard.js";
import { LoggedInContext, CurrentUserContext } from '../../App';

let messageDisplay = <h3>Loading...</h3>

function Messages() {
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [messagesDisplaySwitch, setMessagesDisplaySwitch] = useState(false);

  const isLoggedIn = useContext(LoggedInContext);
  const currentUser = useContext(CurrentUserContext);

  let history = useHistory();

  //Allow only logged-in users access
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

  //Handle loading through navigation
  useEffect(() => {
    if (currentUser) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Handle loading through refresh
  useEffect(() => {
    if (!isInitialRender) {
      fetchMessages();
    } else {
      setIsInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  //Once messages load create message component for each message
  useEffect(() => {
    if (!isInitialRender && messages.length > 0) {
      messageDisplay = 
        <div>
          <h3>Messages</h3>
            {messages.map((message) =>
              <MessageCard
                key={`message${message.id}`}
                message={message}
              />
            )}
        </div>;
      setMessagesDisplaySwitch(!messagesDisplaySwitch);
    } else {
      messageDisplay =
        <div>
          <h3>No Messages at this time.</h3>
        </div>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesLoaded]);

  //Fetch the messages for currentUser
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