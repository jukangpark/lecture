import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "./atom";
import Child from "./Child";

const Parent = () => {
  //   const [users, setUsers] = useRecoilState(userState);
  const setUsers = useSetRecoilState(userState);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data));

    (async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      console.log("우리가 fetchApi 를 통해 받아온 데이터", data);
      setUsers(data);
    })();
  }, [setUsers]);

  return (
    <div>
      <h1>Parent 컴포넌트</h1>
      <Child />
    </div>
  );
};
export default Parent;
