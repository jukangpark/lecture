const Update = () => {
  return (
    <div>
      <h1>업데이트 페이지</h1>
      <form>
        <div>
          <label htmlFor="title">제목 : </label>
          <input id="title" required />
        </div>
        <div>
          <label htmlFor="content">내용 : </label>
          <textarea
            style={{ width: "100%" }}
            rows="50"
            cols="50"
            // value={content}
            // onChange={handleContent}
            id="content"
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 : </label>
          <input
            // value={password}
            // onChange={handlePassword}
            name="password"
            type="password"
            autoComplete="off" // 자동완성 금지
            id="password"
            required
          />
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default Update;
