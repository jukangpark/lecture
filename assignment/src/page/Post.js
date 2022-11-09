import { useState } from "react";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // form 을 제출할때
    e.preventDefault();

    // posts 라는 키에 value 에 우리는 [] 을 저장할거고
    // 그 배열안에 post 들을 추가시켜줄거임.

    // const now = new Date(); // 현재 시간
    const utc = new Date(); // 현재 시간 (Locale) UTC 기준
    //   console.log(utc);
    // 콘솔에는 영국을 기준으로 한 시간이 아니라,  한국을 기준으로한 시간이 잘나오지만 실제 localStorage 에 저장할때는 한국을 기준으로한 값이 안나옴.

    console.log(utc);

    const diff = 9 * 60 * 60 * 1000; // 한국 (KST) 국제 표준시 (UTC) 보다 9시간 더빠름

    // Date.prototype.getTime() 1970년도 1월 1일 00:00:00 UTC 와 현재 날짜 사이의 경과 시간(밀리초) 를 반환함.

    const koreanTime = new Date(utc.getTime() + diff); // 인자로 밀리세컨드를 넣어주게되면, 1970년도를 기준으로 한 시간을 알려줌.

    const newPost = [
      {
        title,
        content,
        password,
        createdAt: koreanTime,
        id: Date.now(),
      },
    ];

    const posts = localStorage.getItem("posts");

    if (posts === null) {
      localStorage.setItem("posts", JSON.stringify(newPost));
    } else {
      const prevPosts = JSON.parse(localStorage.getItem("posts"));
      localStorage.setItem("posts", JSON.stringify([...prevPosts, ...newPost]));
    }

    setTitle("");
    setContent("");
    setPassword("");

    // localStorage.setItem("posts", post);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  /*
    The rows attribute specifies the visible number of lines in a text area.
    The cols attribute specifies the visible width of a text area.
  
  */

  return (
    <div>
      <h1>작성 페이지</h1>
      <form>
        <div>
          <label htmlFor="title">제목 : </label>
          <input value={title} onChange={handleTitle} id="title" required />
        </div>
        <div>
          <label htmlFor="content">내용 : </label>
          <textarea
            style={{ width: "100%" }}
            rows="50"
            cols="50"
            value={content}
            onChange={handleContent}
            id="content"
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 : </label>
          <input
            value={password}
            onChange={handlePassword}
            name="password"
            type="password"
            autoComplete="off" // 자동완성 금지
            id="password"
            required
          />
        </div>
        <button onClick={handleSubmit}>등록</button>
      </form>
    </div>
  );
};

export default Post;
