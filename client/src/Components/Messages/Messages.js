/*A note on the loading method used herein:
    First, several of the useEffect hooks have an "isInitialRender" clause, allowing them to avoid triggering on the initial render. This is useful for avoiding reference to items that haven't loaded yet.

    Second, I've set up two useEffect hooks to handle fetchMessage. The first is triggered by the initial render BUT only calls fetchMessage if currentUser is already loaded, i.e., if this page is accessed via navigation from another page. The second is NOT triggered by the initial render BUT is triggered when currentUser loads.

    Third, I've set up the deployment of the message components to be triggered by a change in messagesLoaded state. However, in order to rerender after the components deploy, I've had to set up a messagesDisplaySwitch state which is triggered just to ensure rerender.

    *whew*

    Oh, also: // eslint-disable-next-line react-hooks/exhaustive-deps is used to prevent an unnecessary warning in the console.
*/

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessageCard from "./MessageCard.js";

let messageDisplay = <h3>Loading...</h3>

function Messages({ isLoggedIn, currentUser }) {
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [messagesDisplaySwitch, setMessagesDisplaySwitch] = useState(false);

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