import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state: number) => state);
  //   const state: any = useSelector((state) => state);
  //   const state: number | unknwon = useSelector((state) => state);

  const dispatch = useDispatch();

  const handlePlus = () => {
    dispatch({ type: "INCREASE" });
  };

  return (
    <div>
      <h1>플러스 버튼</h1>
      <button onClick={handlePlus}>{state}</button>
    </div>
  );
};

export default Home;
