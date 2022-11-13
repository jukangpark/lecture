import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Home2 = () => {
  const state = useSelector((state: number) => state);
  //   const state: any = useSelector((state) => state);
  //   const state: number | unknwon = useSelector((state) => state);

  // TypeScript
  // Any 와 같ㅣ 최상위 타입인 unknown 은 알 수 없는 타입을 의미합니다.
  // Any 와 같이 Unknwon 에는 어떤 타입의 값도 할당할 수 있지만,
  // Unknown 을 다른 타입에는 할당 할 수 없습니다.

  const dispatch = useDispatch();

  const handleMinus = () => {
    dispatch({ type: "DECREASE" });
  };

  return (
    <div>
      <h1>빼기 버튼</h1>
      <button onClick={handleMinus}>{state}</button>
    </div>
  );
};

export default Home2;
