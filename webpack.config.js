// 여기서는 옜날 자바스크립트를 사용해야한다.
const path = require("path");
//파일을 가져오기 위해서 path를 이용함
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
//설치한걸 임포트, 이걸로 인해 웹팩한테 css를 가지고 뭘 어케 할지 알려주는거임

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
//__dirname은 현재의 프로젝트 디렉토리 이름인데, 어디에서든지 접근가능한 node.js전역변수임

//Entry는 파일들이 어디에서 왔는가?
//Output는 그걸 어디에 넣을 것인가?

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        //이렇게 함으로 인해 모든 SCSS 파일을 찾는다
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
            // 연결1) webpacvk이 css를 이해 할 수 있게 됨
          },
          {
            loader: "postcss-loader",
            //인터넷 익스플로러와 호환되게 만듬, 접두사부터 잡다한거까지
            //그렇게 호환성 관련된 걸 해결한 뒤에 연결1)
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
                //plugin들로 구성된 array를 리턴하고 있음
              }
            }
          },
          {
            loader: "sass-loader"
            //Sass, Scss를 받아서 일반 CSS로 바꿔줌
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;

//깊게 이해하지 않아도 괜찮음.
// Sass-loader는 Sass를 CSS로 옮겨주고, postcss-loader는 특정 plugin들을 css에 대해 실행시켜주고
// 그리고 css-loader는 CSS를 가져와주고, ExtractCSS로 그 부분만 추출해주는거임.
