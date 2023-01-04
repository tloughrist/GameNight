import React from "react";

function UserCard({ user, friends }) {

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  )
};

export default UserCard;
