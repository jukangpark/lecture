import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //   req.cookies.user 에 저장된 token 을 가지고 와서 verify 를 통해 디코딩 하기

  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(
      clientToken,
      process.env.SECRET_KEY || "secret key"
    );
    if (decoded) {
      res.locals.user = decoded;
      next();
    } else {
      res.status(401).send({
        error: "unauthorized",
      });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
};
