import mongoose from "mongoose";

//코멘트 댓글 정보를 만듬 ㅋㅋ
//type 하나만해도 가능, 나머지는 옵션이라고 생각하셈. object로 만들어야함.
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    //이 부분은 특정 유저 권한을 만들기 위함, 삭제, 에딧 등등
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
//이것 역시 활용을 위해 init.js에 import 해준다. import "./models/Comment";

//한쪽에서는 video를 생성하고 여기서는 comment를 생성했을때. 어떻게 연관시킬것인가.
//comment에 video의 id를 저장하거나, video가 id의 array를 가지고 있는거임.
//이 comment는 어떤 video와 직접적으로 연결되어 있는지?
//videojs에서 모든 comment id가 담긴 array를 추출하는거임
