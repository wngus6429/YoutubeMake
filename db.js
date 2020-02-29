import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//어디에 Database가 저장되어 있는지 알려줌.
mongoose.connect(process.env.MONGO_URL, {
  //내가 몽고DB를 사용할때 마다
  useNewUrlParser: true, //이봐 이 configuration을 사용
  useFindAndModify: false //이봐 이 configuration을 사용안함
  //이 부분은 크게 신경안써도 됨
});

const db = mongoose.connection; //MongoDb와의 연결을 db로 저장한다.

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`💀 Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

// export const videos = [
//   {
//     id: 123,
//     title: "video awesome",
//     description: "this is something i love",
//     views: 24,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       //이건 사용자임
//       jid: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   },
//   {
//     id: 123456,
//     title: "video perfect",
//     description: "this is something i love",
//     views: 24,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       //이건 사용자임
//       jid: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   }
// ];
//이건 그냥 가짜 데이터 실험을 위한
