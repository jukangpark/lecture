import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Detail = () => {
  const [post, setPost] = useState({});
  const { pathname } = useLocation();
  const postId = pathname.split("/")[2];
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(pathname);
    // console.log(pathname.slice(6, pathname.length)); //    /post/166760330 이 string 을 잘라야함.j
    // const postId = pathname.slice(6, pathname.length);
    // console.log(postId);
    // const posts = JSON.parse(localStorage.getItem("posts"));
    // const post = posts.find((post) => String(post.id) === postId);
    // setPost(post);

    console.log(postId);

    const posts = JSON.parse(localStorage.getItem("posts"));
    const post = posts.find((post) => String(post.id) === postId);
    setPost(post);
    console.log(post);
  }, [pathname]);

  const handleDelete = () => {
    // Internet Explorer(IE) 환경에서는 항상 '기본값'을 넣어줘야함.
    const password = window.prompt("게시물의 비밀번호를 입력해주세요", "");
    // 프롬프트 대화상자의 입력 필드에 원하는 값을 입력하고 확인을 누를 수 있습니다.
    // 값을 입력하길 원하지 않는 경우 cancel 을 눌러서 빠져나가면됩니다.

    if (password !== post.password) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (window.confirm("정말 삭제하시겠어요?")) {
      const posts = JSON.parse(localStorage.getItem("posts"));
      console.log(postId);
      const removedArray = posts.filter((post) => post.id !== Number(postId));
      localStorage.setItem("posts", JSON.stringify(removedArray));
      navigate("/");
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
