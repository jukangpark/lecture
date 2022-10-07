import styled from "styled-components";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: #999999;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: { type: "spring", stiffness: 10 },
  },
  // '설정'을 오브젝트로 옮길 수 있음
  // initial 에 start 라는 프로퍼티
  // animate 에 end
  // https://www.framer.com/docs/introduction/##variants
};

// type 은 기본적으로 spring 이고, tween 을 줄 수도 있음.

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Box animate={{ borderRadius: "100px" }} />
      <Box transition={{ delay: 3 }} animate={{ borderRadius: "100px" }} />
      <Box transition={{ duration: 3 }} animate={{ borderRadius: "100px" }} />
      <Box initial={{ scale: 0 }} animate={{ scale: 1, rotateZ: 360 }} />
      <Box
        transition={{ type: "tween" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />

      <Box variants={myVars} initial="start" animate="end" />
    </div>
  );
};

export default Home;
