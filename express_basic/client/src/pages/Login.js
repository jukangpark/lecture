import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // http://localhost:9000/user/login 으로 POST 하면 {status: ok, message: 회원가입 완료}

  const onValid = ({ id, password }) => {
    setValue("id", "");
    setValue("password", "");

    fetch("http://localhost:9000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isLoggedIn) {
          alert(data.message);
          window.location.replace("/");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <span> 아이디 </span>
        <input
          placeholder="id"
          type="id"
          {...register("id", { required: "id 를 입력해주세요" })}
        />
        <span>{errors.id?.message}</span>
      </div>
      <div>
        <span> 비밀번호 </span>
        <input
          placeholder="비밀번호"
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
        />
        <span>{errors.password?.message}</span>
      </div>
      <button>로그인</button>
    </form>
  );
};

export default Login;

// input 태그에 name 속성을 주지 않으면,
// 서버에서 req.body 를 까봐도 나오지 않음.
