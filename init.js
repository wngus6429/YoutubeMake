import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000; //못 찾으면 4000으로 연결해라는거
const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);
//application을 app파일에서 가져왔기 때문에 이렇게 할 수 있음.

app.listen(PORT, handleListening);
