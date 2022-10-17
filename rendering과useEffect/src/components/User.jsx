import { useEffect } from "react";

const User = ({ user }) => {
  useEffect(() => {
    return () => {
      console.log(`${user.name} 가 삭제되었어요!`);
    };
  }, [user]);

  return (
    <div>
      <span>{user.name}</span>
      <span>{user.age}</span>
    </div>
  );
};

export default User;
