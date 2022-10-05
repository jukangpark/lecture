import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "./atom";

const Child = () => {
  const users = useRecoilValue(userState);
  //   const [users, setUsers] = useRecoilState(userState);
  return (
    <div>
      <h3>Child 컴포넌트</h3>
      <h3>유저 리스트</h3>
      {users?.map((user, index) => (
        <li key={index}>{user.title}</li>
      ))}
    </div>
  );
};

export default Child;
