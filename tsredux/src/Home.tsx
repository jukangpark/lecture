import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IState } from "./reducer";

const Home = () => {
  const state = useSelector((state: IState) => state);

  let number = 0;

  const dispatch = useDispatch();

  const handlePlus = () => {
    dispatch({ type: "INCREASE" });
  };

  console.log(state);

  return (
    <div>
      <h1>플러스 버튼</h1>
      <button onClick={handlePlus}>{state.age}</button>
    </div>
  );
};

export default Home;
