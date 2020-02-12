import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

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
