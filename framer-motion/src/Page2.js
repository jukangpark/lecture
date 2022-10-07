// 마우스 형태에 따른 몇 이벤트를 리스닝 하기
import styled from "styled-components";
import { motion } from "framer-motion";

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
  hover: { scale: 2, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
};

const Page2 = () => {
  return (
    <div>
      <h1>제스처</h1>
      <Wrapper>
        <Box variants={boxVariants} whileHover="hover" whileTap="click" />
      </Wrapper>
    </div>
  );
};

export default Page2;

// while 이라는 prop 을 사용하면, 다양한 선택지가 있음.
// variants를 사용할 때는 무조건 문자열만 넣어주면
// boxVariants 를 찾아가서 해당 프로퍼티를 적용시켜줌
