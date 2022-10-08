import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "./atom";

const Child = () => {
  const users = useRecoilValue(userState);

  const [state, setState] = useState([1, 2]);

  console.log("setState 를 만나기전에", state);

  useEffect(() => {
    setState([1, 2, 3, 4, 5]);
  }, []);

  console.log("setState 를 만나고 난 후", state);
  //   const [users, setUsers] = useRecoilState(userState);

  return (
    <div>
      {state.map((num, index) => (
        <li key={index}>{num}</li>
      ))}
      <h3>Child 컴포넌트</h3>
      <h3>유저 리스트</h3>
      {users?.map((user, index) => (
        <li key={index}>{user.title}</li>
      ))}
    </div>
  );
};

export default Child;
