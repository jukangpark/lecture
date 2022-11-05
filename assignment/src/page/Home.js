import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDate = styled.div`
  color: #999999;
  font-size: 6px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    setPosts(posts);
  }, []);
  return (
    <div>
      <h1>게시판</h1>
      <h3>현재 모든 게시물</h3>
      {posts?.map((post, index) => (
        <div key={index} style={{ border: "1px solid black" }}>
          <Link to={`post/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 10) + "..."}</p>
            <StyledDate>{post.createdAt}</StyledDate>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
