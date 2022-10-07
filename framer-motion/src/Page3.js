import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  drag: {
    backgroundColor: "rgba(46, 204, 113)",
    transition: { duration: 0.4 },
  },
};

const Page3 = () => {
  //   const x = useMotionValue(0);

  //   useEffect(() => {
  //     x.onChange(() => console.log(x.get()));
  //   }, [x]);

  // style={{x}} 를 줘야지만 x값을 출력가능.

  return (
    <div>
      <h1>Page3</h1>
      <Wrapper>
        <Box
          drag
          //   drag="x"
          //   style={{ x }}
          //   whileDrag={{ backgroundColor: "blue" }}
          //   whileDrag={{ backgroundColor: "rgba(46, 204, 113)" }}
          dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
          //   dragElastic={2}
          //   dragSnapToOrigin
          whileDrag="drag"
          variants={boxVariants}
        />
      </Wrapper>
      {/* <button onClick={() => x.set(200)}>Click me</button> */}
    </div>
  );
};

export default Page3;

// 색상을 backgroundColor 가 아닌,
// rgba() 로 주게되면, 색상이 변하게됨. 그 이유는 우리가 준 색상이 '숫자값'으로 되어 있기 때문이다.

// dragConstraints - 허용된 드래그 가능 영역에 제약 조건을 적용한다.
// dragSnapToOrigin - true 일 경우 드래그 가능한 요소는 놓을 때 중심/원점으로 다시 애니메이션 됨.
// dragElastic - 제한된 바깥을 벗어날 수 있는 이동 정도

// motionValue 는 매우 중요한데, 애니메이션 내의 수치를 트래킹 할 때 필요하다.ㅏ
