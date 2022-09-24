import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/express");
// DB_URL 은 .env 에서 관리하시고, .gitignore 에 추가해주셈..

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB ERROR", error);

db.once("open", handleOpen);
db.on("error", handleError);
