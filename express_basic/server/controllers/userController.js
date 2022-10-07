import User from "../models/User";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

export const join = async (req, res) => {
  // http://localhost:9000/user/join 으로 POST 하면 {status: ok, message: 회원가입 완료}
  console.log(req.body);
  const { id, password } = req.body;

  const exists = await User.findOne({ id });

  if (exists) {
    return res
      .status(400)
      .send({ message: "해당 이메일을 가진 유저가 이미 존재합니다." })
      .end();
  }

  try {
    await User.create({
      id,
      password,
    });
  } catch (error) {
    return res.status(400).send({ message: "에러가 발생했습니다." }).end();
  }

  return res.status(201).send({ status: "ok", message: "회원가입 완료" }).end();
  // 이런식으로 res.send() 로 보내게 되면 알아서 json 데이터로 바꿔서 리턴해줌.
};

export const login = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });

  if (!user) {
    return res
      .status(400)
      .send({ message: "아이디가 존재하지 않습니다." })
      .end();
  }

  const ok = await bcyrpt.compare(password, user.password);

  if (!ok) {
    return res
      .status(400)
      .send({ message: "비밀번호가 일치하지 않습니다." })
      .end();
  }

  const token = jwt.sign(
    {
      user_id: user._id,
    },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "10h",
    }
  );

  console.log(token);
  // 토큰이 발급되기는 하는데, cookie 에 못담아주고 있음 이유가 머임??
  // import cookieParser from "cookie-parser";
  // npm i cookie-parser
  // app.use("cookie-parser");

  res.cookie("user", token);
  return res
    .status(200)
    .send({ isLoggedIn: true, message: "로그인 완료" })
    .end();
};

export const comment = (req, res) => {
  console.log(req.body);
  console.log(res.locals.user);
  // 여기서 유저가 가지고 있는 user_id 로 유저를 찾아서,
  // 해당 유저가 가진 comments 라는 배열안에 여기서 받아온 req.body.comment 값을 넣어주면 완료!

  res.status(200).send({ message: "댓글 등록 완료" }).end();
};
