import mongoose from "mongoose";
//영상을 넣으면 DB가 무거워지기 때문에 text 데이터베이스로 활용함.

//여기서는 내 Video들의 형태를 정의함
//해야할것 하나는 model즉 document name이고 다른 하나느 schema(형태) 임
//model은 실제 data임
//즉 파일은 fileUrl, title, description, views, createdAt, comment, creator를 가짐
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    //video의 링크를 집어넣음.
    type: String,
    required: "File URL is required" //충족되지 않는다면 에러 메세지로 뒤에 문자열이 나옴.
  },
  title: {
    //제목을 집어넣음.
    type: String,
    required: "Title is required" //충족되지 않는다면 에러 메세지로 뒤에 문자열이 나옴.
  },
  description: String, //설명을 집어넣음
  views: {
    //이것은 사람들이 클릭한 조회숫자
    type: Number,
    default: 0 //생성하면 기본이 0 이고 조회 횟수에 따라서 올라감
  },
  createdAt: {
    //영상을 올린 날짜
    type: Date,
    default: Date.now //현재 날짜를 반환하는 function
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, //comment와 video연결, 연관성을 위해
      ref: "Comment" //뭐와 연관 짓는가에 comment.js와 연관
      // 예를들어서 ID1에 해당하는 video를 가져와 줘, 그래서 ref를 사용 실제로 video 의 id를 원함
      // 좋아요를 저장하거나, 유저를 저장하거나 할땐 다른 ref를 사용하겠지
      //다른 방법도 있음. 노트 참고 make12 하단
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

//위의 schema를 이용해서 model(데이터) 를 만들어보자.
const model = mongoose.model("Video", VideoSchema);
//model의 이름은 Video , 그리고 Video model의 schema는 VideoSchema가 될것임
export default model;
//이것만으로는 우리 database는 아직 인지를 못 하고 있지. 연결은 되었지만 거기에 model이 있다는건 알지 못함
//그래서 init.js로 가서 추가를 해줘야함.
//import "./models/Video";

//할수 있는게 뭐가 있는지 알고 싶으면 mongoose documentation의 schema section에서 모든 option들을 확인가능
