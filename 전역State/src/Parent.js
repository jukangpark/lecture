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
      setUsers(data);
    })();
  }, [setUsers]);

  return (
    <div>
      <h3>Parent 컴포넌트</h3>
      <p>Content</p>

      <Child />
    </div>
  );
};
export default Parent;
