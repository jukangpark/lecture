import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}); // 해시함수 를 통해 비밀 번호 암호화

const User = mongoose.model("User", userSchema);

export default User;

// express.js (컨트럴러) - mongoose - mongodb (db) - User
// User id 를 통해서

// db 에서 해당 User 를 id 로 찾아요!

// 그 User 의 해시화된(암호화된) 비밀 번호 === 사용자가 입력한 비밀번호
// 오 이사람이 올바른 비밃너호를 입력했으니까,

// JWT Token 을 발급을 해줘요!
// cookie <- Json Web Token 을 넣어주면 (서버에서)
// 프론트단에서 로그인된 유저의 정보를 받아서,
//
// 로그인 승인처리! - 현재 로그인된유저의 값을 서버에서 받아왔겠죠.! 이제서야 로그인이 됬기 때문에 해당 유저의 데이터를 우리는 볼 수 있는거에요!

// 그 다음 요청(로그인 을 하고난 후에)
// cookies req.header 에 자동으로 담기게 되는데,
// 서버에서는 req.header 에 cookie 가 담겨있ㄴ느데, cookie 안에 Token 을 확인하고,
// 오 우리가 발급해준 토큰이 맞네 ? -> 맞으면 그 요청을 수행하는거에요!
// shop 쇼핑을 한다.

// localhost:9000/shop/900909009/buy -> Auth 인증 (이 사람이 유효한 권한을 가졌는지) - JWT 을 검사를 합니다.(미들웨어) - 요청을 수행합니다.
// 403 error Authoried Failed
