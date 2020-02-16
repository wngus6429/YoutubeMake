import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000; //못 찾으면 4000으로 연결해라는거
const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);
//application을 app파일에서 가져왔기 때문에 이렇게 할 수 있음.

app.listen(PORT, handleListening);

//app.js와 나눈것은 니코가 나누는걸 좋아하기도 하고
//DB, 모델, 익스프레스와 모든것을 불러오기 위해
//MVC는 모델, 뷰, 컨트롤을 위미하며
//Model 은 데이터, view는 데이터의 모양, control은 데이터를 보여줌
//app.js는 오직 express를 배치 하기 위해
