import mongoose from "mongoose"; //passport의 시작
import passportLocalMongoose from "passport-local-mongoose";
//유저의 정보를 만드는것임.
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number, //페북이랑 깃 허브랑 같이 모아서 관리함. 그래야 중복가입 방지.
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ]
});

//passportLocalMongoose를 임포트 했으니 사용해야지?
//뒷 부분은 어떤 field를 username으로 할 것인지 알려줘야함. 뭐든 되는데 email 사용
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema); //UserSchema로 부터 받는 모델(데이터) 생성
//"User"여기안에 데이터를 넣어두고 model 안에 각납
export default model;
