import app from "./app";

const PORT = 4000;
const handleListening = () => console.log(`listening on:http://localhost:${PORT}`);
//application을 app파일에서 가져왔기 때문에 이렇게 할 수 있음.

app.listen(PORT, handleListening);
