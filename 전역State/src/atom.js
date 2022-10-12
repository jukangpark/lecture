import { atom } from "recoil";

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const userState = atom({
  key: "user",
  default: [],
});

// Atoms 는 상태의 단위,
// 업데이트와 구독이 가능

// atom 이 업데이트 되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 랜더링 된다.
// atoms 는 런타임에서 생성될 수도 있다.
// atoms 는 react의 로컬 컨포넌트 대신 상용할 수 있다.
// 동일한 atom 이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.
// Atoms 는 atom 함수를 사용해 생성한다.

// 고유한 키가 필요하다. 두개의 atom이 같은 키를 갖는 것은 오류이기 때문에 키값은 전역적으로 고유하도록 해야한다.
// React 컴포넌트의 state 처럼 기본값도 가진다.
