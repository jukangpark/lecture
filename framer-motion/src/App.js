import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { useScroll } from "framer-motion";

const Btn = styled.button``;

function Component() {
  const { scrollYProgress } = useScroll();

  console.log(scrollYProgress);

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        backgroundColor: "pink",
        height: "25px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        transformOrigin: "0%", // transformOrigin : 어느 곳을 기준으로 progressBar 를 늘릴 것인지
      }}
    />
  );
}

const Box = ({ x, y }) => (
  <motion.div
    className="box"
    animate={{ x, y }}
    whileHover={{
      scale: 1.2,
      transition: { duration: 1 },
    }}
    whileTap={{ scale: 0.9 }}
  >
    box
  </motion.div>
);

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const plusX = () => {
    setX(x + 30);
  };

  const plusY = () => {
    setY(y + 30);
  };

  return (
    <div>
      <div>
        <Btn onClick={plusX}>plusX</Btn>
        <Btn onClick={plusY}>plusY</Btn>
      </div>
      <Box x={x} y={y} />
      <Component />
      <section style={{ height: "100vh" }}>section</section>
      <section style={{ height: "100vh" }}>section</section>
      <section style={{ height: "100vh" }}>section</section>
    </div>
  );
};

export default App;
