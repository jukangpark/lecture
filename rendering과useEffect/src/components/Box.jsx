import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 100px;
  line-height: 100px;
  text-align: center;
  border: 3px solid whitesmoke;
`;

const Box = ({ num }) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log(`반복되는${num}`);
    }, [2000]);

    // 왜 Box5 가 삭제되었는대도 불구하고,
    // Box5 는 여전히 window.setInterval 메서드에 의해 호출이 가능함?

    console.log(`${num} box가 최초 렌더링 되었습니다.`);

    return () => {
      console.log(`${num} box 가 willUnMount 할겁니다.`);
      clearInterval(timerId);
    };
  }, [num]);

  // useEffect 안에서 사용하게 되는 state 나 props 가 존재한다면,
  // [] deps 에 넣어줘야 합니다.
  // 왜냐하면 [] deps 에 state 나 props 를 넣어주지 않는다면
  // state 나 props 가 바뀌더라도, useEffect() 안의 코드들을 다시 실행하지 않아
  // 왜 useEffect() 안의 코드를 다시 실행하지 않아요?
  // 컴포넌트가 최초 렌더링 될 때 '한번'만 Box 컴포넌트의 useEffect 의 코드블럭이 실행될테니까
  // [] 빈 배열에 props 를 넣어주지 않는다면 최신 props 가 담기지 않음.

  return <StyledBox id={num}>{num}</StyledBox>;
};

export default React.memo(Box);
