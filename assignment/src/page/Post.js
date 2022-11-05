import { useState } from "react";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  //   const utc = new Date(); // 현재 시간 (Locale) 한국 기준
  //   //   console.log(utc); // 여기서는 한국 시간이 잘나오지만 localStorage 에 저장할때는 제대로된 값이 안나옴.

  //   const diff = 9 * 60 * 60 * 1000; // 한국 (KST) 국제 표준시 (UTC) 보다 9시간 더빠름

  //   const koreanTime = new Date(utc.getTime() + diff);

  //   console.log(koreanTime);

  // 1920년 1월 1일 00:00:00 UTC 와 주어진 날짜까지의 밀리세컨드를 반환.

  //   const diff = 9 * 60 * 60 * 1000; // 한국 (KST) 국제 표준시 (UTC) 보다 9시간 더빠름
  //   console.log(utc + diff);

  //   const koreanDate = new Date(utc + diff);
  //   console.log(koreanDate);

  const handleSubmit = (e) => {
    // form 을 제출할때
    e.preventDefault();

    // posts 라는 키에 value 에 우리는 [] 을 저장할거고
    // 그 배열안에 post 들을 추가시켜줄거임.

    // const now = new Date(); // 현재 시간
    const utc = new Date(); // 현재 시간 (Locale) UTC 기준
    //   console.log(utc); // 여기서는 한국 시간이 잘나오지만 localStorage 에 저장할때는 제대로된 값이 안나옴.

    const diff = 9 * 60 * 60 * 1000; // 한국 (KST) 국제 표준시 (UTC) 보다 9시간 더빠름

    const koreanTime = new Date(utc.getTime() + diff);

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
