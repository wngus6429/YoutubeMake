import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, //comment와 video연결, 연관성을 위해
      ref: "Comment" //뭐와 연관 짓는가에 comment.js와 연관
      // 예를들어서 ID1에 해당하는 video를 가져와 줘, 그래서 ref를 사용 실제로 video 의 id를 원함
      // 좋아요를 저장하거나, 유저를 저장하거나 할땐 다른 ref를 사용하겠지
      //다른 방법도 있음. 노트 참고 make12 하단
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;

//createdAt은 현재의 날짜를 반환하는 기능
