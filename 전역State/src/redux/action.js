export const increase = () => ({
  type: "INCREASE",
});

export const decrease = () => ({
  type: "DECREASE",
});

// Action 이란
// 하나의 객체이다.

// increase 와 decrease 라는 함수는
// 액션 생성자 함수이다.
// 이 친구들은 각각 객체(action)를 리턴하고있다.
