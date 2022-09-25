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
  res.cookie("user", token);
  return res.status(200).send({ result: "ok", message: "로그인 완료" }).end();
};
