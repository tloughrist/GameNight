import React from "react";

function MessageCard({ message }) {
  
  //add delete and responde buttons along with sender info
  //for sender info, include whether it relates to a specific gamenight

  return (
    <div className="card">
      <p>{message.topic}</p>
      <p>{message.body}</p>
    </div>
  );
}

export default MessageCard;