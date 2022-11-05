import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Detail = () => {
  const [post, setPost] = useState({});
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
    console.log(pathname.slice(6, pathname.length)); //    /post/166760330 이 string 을 잘라야함.j

    const postId = pathname.slice(6, pathname.length);
    console.log(postId);

    const posts = JSON.parse(localStorage.getItem("posts"));

    const post = posts.find((post) => String(post.id) === postId);
    setPost(post);
  }, [pathname]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      alert("게시물이 삭제되었습니다.");
    }
  };

  return (
    <div>
      <h1>Detail</h1>
      <h3>{post.title}</h3>
      <h3>{post.content}</h3>
      <p>{post.createdAt}</p>
      <button>
        <Link to={`/post/${post.id}/update`}>업데이트</Link>
      </button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default Detail;
