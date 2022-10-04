import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useScroll } from "framer-motion";
import { makeImagePath } from "./utils";

const Btn = styled.button``;

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress);

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      // console.log("Page scroll:", latest);
      // scrollXProgress : The scroll position between the defined offsets, as a value between 0 and 1
    });
  }, []);

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        // scaleX,
        backgroundColor: "red",
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
  const section1 = useRef();
  const section2 = useRef();
  useEffect(() => {
    //clientHeight 는 요소의 내부 높이입니다. 패딩 값은 포함되며, 스크롤바, 테두리, 마진은 제외됩니다.
    // offsetHeight 는 요소의 높이입니다. 패딩, 스크롤 바, 테두리(Border)가 포함됩니다. 마진은 제외됩니다.
    // scrollHeight  는 요소에 들어있는 컨텐츠의 전체 높이입니다. 패딩과 테두리가 포함됩니다. 마진은 제외됩니다.
    // offsetTop 은 document 와 얼마나 떨어져있는지를 알려줌

    console.log("section1 의 offsetTop", section1.current.offsetTop);
    console.log("section1 의 offsetTop", section2.current.offsetTop);
    console.log("section1 의 clientScrollTop", section1.current.scrollTop);
  }, []);

  window.addEventListener("scroll", () => {
    console.log("html 에서 scroll된 px", window.scrollY);
    if (window.scrollY + 30 > section1.current.offsetTop) {
      section1.current.style.backgroundColor = "whitesmoke";
      section1.current.style.marginLeft = 0;
    }
    if (window.scrollY < section1.current.offsetTop) {
      section1.current.style.backgroundColor = "transparent";
      section1.current.style.marginLeft = "-50px";
    }

    if (window.scrollY + 30 > section2.current.offsetTop) {
      section2.current.style.backgroundColor = "whitesmoke";
    }
    if (window.scrollY < section2.current.offsetTop) {
      section2.current.style.backgroundColor = "transparent";
    }
  });
  // console.log("section1 의 clientHeight", section1.current.clientHeight); 이렇게 하면 제대로 동작 안함.. 아직 element가 렌더링 안되서

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  // useEffect(() => {
  //   // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
  //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  // }, []);

  const [movies, setMovies] = useState([]);

  const API_KEY = "d3fbf3b20d42f2b6f9751d87fc9f03ed";
  const BASE_PATH = "https://api.themoviedb.org/3";

  useEffect(() => {
    fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results.slice(0, 10));
      });
  }, []);
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
      <ScrollBar />
      <div>
        <Btn onClick={plusX}>plusX</Btn>
        <Btn onClick={plusY}>plusY</Btn>
      </div>
      <Box x={x} y={y} />
      {/* <motion.div
        className="carousel"
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel"
        >
          {movies?.map((movie, index) => (
            <motion.div className="item" key={index}>
              <div
                style={{
                  backgroundImage: `url(${makeImagePath(
                    movie.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div> */}
      <h1>section1</h1>
      <section
        style={{
          height: "100vh",
          transitionDuration: "400ms",
          marginLeft: "-100px",
        }}
        ref={section1}
      />

      <h1>section2</h1>
      <section style={{ height: "100vh" }} ref={section2}></section>
      <section style={{ height: "100vh" }}>section</section>
    </div>
  );
};

export default App;
