const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const cors = require('cors')
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app)
const io = socketio(server)
app.use(cors())
app.use(router)
io.on('connection', (socket) => {
  console.log('새로운 유저가 접속했습니다.')
  socket.on('join', ({name, room}, callback) => {
    console.log(socket.id, name, room)
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) callback({error : '에러가 발생했습니다.'})

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, ${user.room}에 오신 것을 환영합니다.`,
    })
    // socket.broadcast.to(user.room).emit('message', {
    //   user: 'admin',
    //   text: `${user.name}님이 가입하셨습니다.`,
    // })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
    socket.join(user.room)
    callback()
    return socket.id
  })
  socket.on('sendMessage', (message, callback) => {
    console.log('확인용id', socket.id)
    const user = getUser(socket.id)
    // console.log(user)
    // console.log(typeof message, message)
    console.log(message)
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

    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
      type: type,
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

server.listen(PORT,()=>console.log(`서버가 ${PORT} 에서 시작되었어요`))