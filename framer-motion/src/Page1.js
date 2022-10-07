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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      //   delayChildren: 0.5, // 모든 자식들에게 delay 를 줄 수 있음.
      staggerChildren: 0.5, // 이건 첫번째 원에 딜레이를 0.5를 주고 두번째는 0.5 * 2를 주고 그 다음에 3을 줌.
    },
  },
};

// const circleVariants = {
//   start: {
//     scale: 0,
//   },
//   end: {
//     scale: 2,
//     transition: {
//       type: "spring",
//       bounce: 0.8,
//       duration: 5,
//     },
//   },
// };

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

/*  
그래서 이제 뭘 해야 하냐면,
이 애니메이션이 어떻게 발생하는지를 생각해야만해.
Box가 먼저 나타나고, Box를 먼저 나타나게 설정한 다음, 자식들이 따라오게 할거야.
고로 먼저 Box 애니메이션을 먼저 하자고.
그리고 이를 위해서, Variants를 한 번 더 사용할거야
명심해, start랑 end는 반드시 boxVariants 오브젝트의 property여야해.


*/

const Page1 = () => {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        {/* <Circle initial="start" animate="end" />
        <Circle initial="start" animate="end" />
        <Circle initial="start" animate="end" />
        <Circle initial="start" animate="end" /> */}
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
};

export default Page1;

/*부모 컴포넌트가 variants랑  initial의 variant 이름,
animate의 variant이름을 가지고 있을 때에
기본 동작으로, Motion은 이걸 복사해서
자식들에게 붙여넣어 줄거야. 자동으로 말이지.
이건 기본으로 발생되는 거야.
물론 자식들한테만.*/
