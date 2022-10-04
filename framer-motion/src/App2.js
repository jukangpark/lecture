import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "./utils";

const API_KEY = "d3fbf3b20d42f2b6f9751d87fc9f03ed";
const BASE_PATH = "https://api.themoviedb.org/3";

const Box = styled(motion.div)`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  font-size: 66px;
  /* position: relative; */
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    // zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.15,
      type: "tween",
    },
  },
};

const App2 = () => {
  const [movies, setMovies] = useState([]);
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
  return (
    <div>
      <h1>App2</h1>

      {movies.map((movie) => (
        <Box
          layoutId={`${movie.id}`} // string이어야 하기 때문.
          key={movie.id}
          whileHover="hover"
          initial="normal"
          //   onClick={() => onBoxClicked(movie.id)}
          variants={boxVariants}
          transition={{ type: "tween" }}
          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
        />
      ))}
    </div>
  );
};

export default App2;
