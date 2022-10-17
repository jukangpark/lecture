import { useEffect } from "react";
import User from "./User";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
};

export default UserList;
