const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 3001;

const app = express();

// ssl 위한 준비

const https = require("https");
const fs = require("fs");
// .env 파일에 환경 변수를 불러올 수 있도록 합니다.
require("dotenv").config();

const KEY_URL = process.env.KEY_URL;

// https 서버를 생성합니다.
// key 파일 옵션과 라우팅 정보 등이 들어있는 app을 함께 넘깁니다.
// https 포트 번호는 4000입니다.
app.use(
  cors({
    origin: ["http://localhost:3000", "https://i8b203.p.ssafy.io"],
    transports: ["websocket", "polling", "ws", "wss"],
    credentials: true,
  })
);

const options = {
  key: fs.readFileSync(KEY_URL + "/privkey.pem"),
  cert: fs.readFileSync(KEY_URL + "/cert.pem"),
  ca: fs.readFileSync(KEY_URL + "/chain.pem"),
};

const httpsServer = https.createServer(options, app);
const io = socketio(httpsServer, {
  cors: {
    origin: ["http://localhost:3000", "https://i8b203.p.ssafy.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(router);

httpsServer.listen(4000, () => {
  console.log(`4000번 포트에서 도는 중`);
});

io.on("connection", (socket) => {
  console.log("새로운 유저가 접속했습니다.");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) callback({ error: "에러가 발생했습니다." });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    socket.join(user.room);
    callback();
    return socket.id;
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    let type;
    if (message === 'firstForm') {
      type = 'firstForm'
    } else if (message === 'secondDeliveryForm') {
      type = 'secondDeliveryForm'
    } else if (message === 'secondPickUpForm') {
      type = 'secondPickUpForm'
    } else if (message === 'thirdPickUpForm') {
      type = 'thirdPickUpForm'
    } else if (message === 'thirdDeliveryForm') {
      type = 'thirdDeliveryForm'
    } else if (message.slice(0, 2) === "금액") {
      type = "payment"
    } else {
      type = 'message'
    }
    const time = `${new Date()
      .getHours()
      .toString()
      .padStart(2, "0")}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      type: type,
      time: time,
    });
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}님이 퇴장하셨습니다.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("유저가 나갔습니다.");
  });
});