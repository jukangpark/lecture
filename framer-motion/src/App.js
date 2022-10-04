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
      console.log("Page scroll:", latest);
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
  const [width, setWidth] = useState(0);
  const carousel = useRef();

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

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
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
      <motion.div
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
              <img
                src={`${makeImagePath(movie.backdrop_path, "w500")}`}
                alt={`${movie.title}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <section style={{ height: "100vh" }}>section</section>
      <section style={{ height: "100vh" }}>section</section>
      <section style={{ height: "100vh" }}>section</section>
    </div>
  );
};

export default App;
