const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // npm i cors 해준다음 middleware 에 추가하기.

const userRouter = express.Router();

const join = (req, res) => {
  console.log(req);

  // const exists = await User.findOne({ email });

  // if (exists) {
  //   return res
  //     .status(400)
  //     .send({ message: "해당 이메일을 가진 계정이 존재합니다." })
  //     .end();
  // }

  // const trimEmail = (email: string) => {
  //   const index = email.indexOf("@");
  //   return email.slice(0, index);
  // };

  // try {
  //   await User.create({
  //     email,
  //     password,
  //     username: trimEmail(email),
  //   });
  // } catch (error) {
  //   return res.status(400).send({ message: "에러가 발생했습니다." }).end();
  // }

  // return res
  //   .status(201)
  //   .send({ result: "ok", message: "회원 가입 완료" })
  //   .end();

  // userSchema.pre("save", async function () {
  //   if (this.isModified("password")) {
  //     this.password = await bcrypt.hash(this.password, 5);
  //   }
  // });
  // userSchema 에서 이런식으로 작성해주는 이유 ?
  // -> 사용자가 비밀번호를 변경할 때, 기존에 해시된 비밀번호를 다시 해시하면 안되기 때문에
  // -> 비밀번호에 변경이 생겼을 경우에만 해당 비밀번호를 해시함수를 통해!!

  return res.status(200).send({ result: "ok", message: "로그인 완료" }).end();
};

userRouter.route("/join").post(join);

app.use("/user", userRouter);

// 로그인
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res
//       .status(400)
//       .send({ message: "아이디가 존재하지 않습니다." })
//       .end();
//   }

//   const ok = await bcrypt.compare(password, user.password);

//   if (!ok) {
//     return res
//       .status(400)
//       .send({ message: "비밀번호가 일치하지 않습니다." })
//       .end();
//   }

//   const token = jwt.sign(
//     {
//       user_id: user._id,
//     },
//     process.env.SECRET_KEY || "secret key",
//     {
//       expiresIn: "10h",
//     }
//   );
//   res.cookie("user", token); // user 라는 키값을 가진 객체에 token 을 넣어줌. ㅋ
//   return res.status(200).send({ result: "ok", message: "로그인 완료" }).end();
// };

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Now Server is listening on PORT : ${PORT}`);
});
