import { useNavigate } from "react-router-dom";

const Join = () => {
  // http://localhost:9000/user/join 으로 POST 하면 {status: ok, message: 회원가입 완료}

  const navigate = useNavigate();
  // navigate("/login");
  return (
    <form action="/user/join" method="POST">
      <div>
        <span> 아이디 </span>
        <input placeholder="id" type="id" name="id"></input>
      </div>
      <div>
        <span> 비밀번호 </span>
        <input placeholder="비밀번호" type="password" name="password"></input>
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default Join;

// input 태그에 name 속성을 주지 않으면,
// 서버에서 req.body 를 까봐도 나오지 않음.
