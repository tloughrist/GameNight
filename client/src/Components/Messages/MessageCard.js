import React from "react";

function MessageCard({ message }) {
  
  //add delete and responde buttons along with sender info
  //for sender info, include whether it relates to a specific gamenight

  return (
    <div className="card">
      <p>Sender: {message.sender.name}/{message.sender.username}</p>
      <p>Sent: {message.created_at}</p>
      <p>{message.topic}</p>
      <p>{message.body}</p>
      <button>Respond</button>
      <button>Delete</button>
    </div>
  );
}

export default MessageCard;