import React, { useState } from "react";

const Join = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleJoin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(id, password);

    if (id === "") return alert("아이디를 입력하세요!");

    if (password === "") return alert("패스워드를 입력하세요!");

    fetch("http://localhost:9000/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.log("에러코드", error));
    // 여기서 서버와 비동기 통신 한 이후에, JWT 받아서
    // localStorage 에 저장해줄지,
    // cookie 에 저장해줄지, 생각해봐야함

    // 각각의 장단점에 대해 알아야하고,
    // 우선 Express.js 서버에서
    // 두가지 경우를 모두 테스트

    setId("");
    setPassword("");
  };

  const handleIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setId(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setPassword(e.currentTarget.value);
  };

  return (
    <div>
      <form>
        <div>
          <span>아이디 : </span>
          <input
            placeholder="id"
            onChange={handleIdChange}
            value={id}
            type="id"
          />
        </div>
        <div>
          <span>비밀번호 : </span>
          <input
            placeholder="password"
            onChange={handlePasswordChange}
            value={password}
            type="password"
          />
        </div>
        <button onClick={handleJoin}>회원가입</button>
      </form>
    </div>
  );
};

export default Join;

// 리엑트에서 리렌더링을 줄일 수 있는 방법.
