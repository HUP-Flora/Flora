const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const cors = require('cors')
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 3001

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// ssl 위한 준비

const https = require('https')
const fs = require('fs')
// .env 파일에 환경 변수를 불러올 수 있도록 합니다.
require("dotenv").config();

app.use(router)
io.on('connection', (socket) => {
  console.log('새로운 유저가 접속했습니다.')
  socket.on('join', ({name, room}, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) callback({error : '에러가 발생했습니다.'})
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
    socket.join(user.room)
    callback()
    return socket.id
  })
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
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
    } else {
      type = 'message'
    }
    const time = `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`
    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
      type: type,
      time: time,
    })
    callback()
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name}님이 퇴장하셨습니다.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
    console.log('유저가 나갔습니다.')
  })
})

const KEY_URL = process.env.KEY_URL
const options = {
  key: fs.readFileSync(KEY_URL + '/privkey.pem'),
  cert: fs.readFileSync(KEY_URL + '/cert.pem'),
  ca: fs.readFileSync(KEY_URL + '/chain.pem')
}

// https 서버를 생성합니다.
// key 파일 옵션과 라우팅 정보 등이 들어있는 app을 함께 넘깁니다.
// https 포트 번호는 3001입니다.
app.use(cors({
  origin: ['http://localhost:3000', 'https://i8b203.p.ssafy.io'],
  transports: ['websocket', 'polling', "ws", "wss"],
  credentials: true
}));
https.createServer(options, app).listen(4000, () => {
  console.log(`3001번 포트 도는 중`);
});

console.log(process.env.NODE_ENV)

// server.listen(PORT,()=>console.log(`서버가 ${PORT} 에서 시작되었어요`))