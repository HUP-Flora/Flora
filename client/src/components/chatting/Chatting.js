import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import Input from "./input/Input";
import Messages from "./messages/Messages";

import {useRecoilValue} from "recoil";
import {nameState, roomState} from "../../recoil/chatting"
import {listenMessage, socketJoin} from "../../utils/chatting";
import {ChatLayout} from "../../styles/chatting/ChattingStyle";

const ENDPOINT = 'http://localhost:5000'

let socket;

const Chat = () => {
  const name = useRecoilValue(nameState)
  const room = useRecoilValue(roomState)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket = io(ENDPOINT)
    socketJoin(name, room)
  }, [ENDPOINT, window.location.search])

  useEffect(() => {
    listenMessage(setMessages)
  }, [])

  return (
    <ChatLayout>
      <Messages messages={messages}/>
      <Input message={message} setMessage={setMessage} />
    </ChatLayout>
  )
}

export default Chat