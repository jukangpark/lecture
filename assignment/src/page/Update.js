import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Update = () => {
  // const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const { pathname } = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const postId = pathname.split("/")[2];

    console.log(postId);

    const posts = JSON.parse(localStorage.getItem("posts"));
    // setPosts(posts);

    const post = posts.find((post) => String(post.id) === postId);
    setPost(post);
    setTitle(post.title);
    setContent(post.content);
    setPassword(post.password);
  }, [pathname]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const password = window.prompt("게시물의 비밀번호를 입력해주세요", "");
    // 프롬프트 대화상자의 입력 필드에 원하는 값을 입력하고 확인을 누를 수 있습니다.
    // 값을 입력하길 원하지 않는 경우 cancel 을 눌러서 빠져나가면됩니다.

    if (password !== post.password) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    const utc = new Date();

    const diff = 9 * 60 * 60 * 1000;

    const koreanDate = new Date(utc.getTime() + diff);

    const updatedPost = {
      title,
      content,
      password,
      id: post.id,
      createdAt: koreanDate,
    };

    const posts = JSON.parse(localStorage.getItem("posts"));

    const IndexWillUpdate = posts.findIndex(
      (post) => post.id === Number(post.id)
    );

    posts.splice(IndexWillUpdate, 1, updatedPost);

    // 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환

    localStorage.setItem("posts", JSON.stringify([...posts]));
  };

  return (
    <div>
      <h1>업데이트 페이지</h1>
      <form>
        <div>
          <label htmlFor="title">제목 : </label>
          <input id="title" required value={title} onChange={handleTitle} />
        </div>
        <div>
          <label htmlFor="content">내용 : </label>
          <textarea
            style={{ width: "100%" }}
            rows="50"
            cols="50"
            onChange={handleContent}
            id="content"
            required
            value={content}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 : </label>
          <input
            onChange={handlePassword}
            name="password"
            type="password"
            autoComplete="off" // 자동완성 금지
            id="password"
            required
            value={password}
          />
        </div>
        <button onClick={handleUpdate}>등록</button>
      </form>
    </div>
  );
};

export default Update;
