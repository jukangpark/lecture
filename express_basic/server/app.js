// import dotenv from "dotenv";
// dotenv.config();
import "./db";
import express from "express"; // express 모듈 불러오기
import userRouter from "./routers/userRouter";

// express 사용
const app = express();

// app.use 는 미들웨어를 사용하겠다는 의미이다.
// Express 4.16.0 버전 부터 body-parser 의 일부 기능이 익스프레스에 내장 body-parser 에 연결
// post 방식으로 데이터를 서버로 보내게 되면, 데이터는 암호화 되어서 읽을 수가 없다.
// get 방식은 queryString 으로 전달됨.
// 이를 해결 하기 위해 두 가지 미들웨어가 필요함.
// 데이터를 전달 할 때 포멧 양식이
// 1. x-www-form-urlencoded
// 2. json
// 이렇게 되어 있는 데이터를 해석하여 req.body 를 통해 읽을 수 있게 한다.
// urlencoded 만 마운트하면 json 양식의 파일을 해석하지 못하고 그 반대의 경우도 마찬가지이다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // 여기서 Auth 처리 가 가능하다.
  console.log("이건 미들웨어입니다.");
  next(); // 미들웨어에서 next 를 호출해주지않으면, 여기서도 계속 대기해버림..
});

app.get("/", (req, res) => {
  //   res.send("Hello World!"); 서버에서 아무른 response 를 주지 않으면 어떻게 되나요?
  // 클라이언트에서는 응답 받을 때까지 기다리게 됨.

  return res.send("Hello World");
});

app.use("/user", userRouter);

app.post("/join", (req, res) => {
  console.log("우리가 받은 req.body = ", req.body);
  return res.end();
});

app.listen(9000, () => {
  console.log("Server is starting");
});

/* 

1. @babel/core : Babel 기반에 핵심 패키지
2. @babel/cli : Babel 코멘트를 사용할 수 있게 해주는 패키지
3. @babel/preset-env : Babel 에 여러 플러그인을 스스로 조합해놓은 미리 준비된 프리셋을 사용할 때 사용되는 패키지
4. @babel/node : 코드 Transpile 과 파일 실행을 동시에 할 수 있게 해주는 패키지

*/
