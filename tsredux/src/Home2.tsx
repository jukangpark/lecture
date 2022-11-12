import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Home2 = () => {
  const state = useSelector((state: number) => state);
  //   const state: any = useSelector((state) => state);
  //   const state: number | unknwon = useSelector((state) => state);

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
