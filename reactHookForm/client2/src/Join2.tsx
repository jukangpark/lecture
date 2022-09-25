import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  password: string;
  password2: string;
}

const Join2 = () => {
  //   console.log(useForm());
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  console.log(errors?.email?.message); // 올바르지 않는 이메일 형식입니다.

  const onValid = ({ email, password, password2 }: IFormData) => {
    console.log(email, password);

    if (password !== password2) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    setValue("email", "");
    setValue("password", "");
    setValue("password2", "");

    fetch("http://localhost:9000/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <span>아이디 : </span>
          <input
            placeholder="@naver.com"
            {...register("email", {
              required: "email 를 입력해주세요",
              maxLength: 20,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "올바르지 않은 이메일 형식입니다.",
              },
            })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <div>
          <span>비밀번호 : </span>
          <input
            placeholder="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password"
          />
        </div>
        <span>{errors?.password?.message}</span>
        <div>
          <span>비밀번호 확인: </span>
          <input
            placeholder="비밀번호 확인"
            {...register("password2", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password"
          />
        </div>
        <span>{errors?.password2?.message}</span>
        <button onClick={handleSubmit(onValid)}>회원가입</button>
      </form>
    </div>
  );
};

export default Join2;
