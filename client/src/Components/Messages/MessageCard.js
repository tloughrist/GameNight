import React from "react";

let messageDisplay = <p>Message loading...</p>

function MessageCard({ message, messagesLoaded }) {

  console.log(message)
  
  if (messagesLoaded) {
    messageDisplay =
      <>
        <p>{message.topic}</p>
        <p>{message.body}</p>
      </>
  }

  return (
    <div className="card">
      {messageDisplay}
    </div>
  )
}

export default MessageCard;