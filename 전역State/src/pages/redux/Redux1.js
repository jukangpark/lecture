import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../../redux/action";

const Redux1 = () => {
  const count = useSelector((state) => {
    console.log(state);
    return state.rootReducer.count;
  });

  const button = useSelector((state) => state.buttonReducer);

  useEffect(() => {
    console.log(count);
  }, []);

  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
    // dispatch의 인자로 action 객체를 전달해주기 위해
    // increase() 라는 액션 생성자 함수를 호출해서
    // action 객체를 인자로 넣어줌.
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  // 그리고 이 onIncrease 라는 함수는
  // onClick 의 이벤트 핸들러로 넣어줄거임
  // 이벤트 핸들러란 -> 특정 요소에서 발생한 이벤트를 처리하기위해 함수를 작성해서
  // 연결하는 걸 의미함.
  // 이벤트 핸들러가 연결된 특정 요소에서 지정된 타입의 이벤트가 발생하게되면,
  // 웹 브라우저는 이벤트 리스너에 연결된 이벤트 핸들러를 실행함.
  // 이벤트 핸들러 함수에는 이벤트 객체를 인자로 전달받을 수 있음.
  // 이렇게 전달받은 이벤트객체를 활용하여 이벤트의 성질을 결정하거나, 이벤트의 기본 동작을 막을 수 있음.

  const handleAlarmClick = () => {
    console.log("알람을 클릭하였습니다.");
    dispatch({ type: "BUTTON", payload: "Alarm" });
  };

  const handleRackClick = () => {
    console.log("랙을을 클릭하였습니다.");
    dispatch({ type: "BUTTON", payload: "Rack" });
  };

  return (
    <div>
      Redux1 페이지입니다.
      <p>컨텐츠</p>
      <h1>Redux 를 활용한 상태관리</h1>
      <p>"useSelector()를 통해 리턴된 값은? :"{count}</p>
      <div>
        <button onClick={onIncrease}>
          Redux 를 통해 state.count 의 값을 바꿔보아요 increase
        </button>
      </div>
      <button onClick={onDecrease}>
        Redux 를 통해 state.count 의 값을 바꿔보아요 decrease
      </button>
      <div>
        <button onClick={handleAlarmClick}>Alarm</button>
        <button onClick={handleRackClick}>Rack</button>

        <p>현재 Button state 는?</p>
        <div>
          {button.Alarm ? "button.Alarm 은 true" : "button.Alarm 은 false"}
        </div>
        <div>
          {button.Rack ? "button.Rack 은 true" : "button.Rack 은 false"}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Redux1;
