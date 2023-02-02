import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Input from "./input/Input";
import Messages from "./messages/Messages";

import { useRecoilValue } from "recoil";
import { isErrorModalShowState, nameState, roomState } from "../../recoil/chatting";
import { listenMessage, socketJoin } from "../../utils/chatting";
import { ChatLayout } from "../../styles/chatting/ChattingStyle";
import ErrorModal from "./errorModal/ErrorModal";

const ENDPOINT = "http://localhost:5000";

let socket;

const Chat = () => {
	const name = useRecoilValue(nameState);
	const room = useRecoilValue(roomState);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket = io(ENDPOINT);
		socketJoin(name, room);
	}, [ENDPOINT, window.location.search]);

	useEffect(() => {
		listenMessage(setMessages);
	}, []);

	const isErrorModalShow = useRecoilValue(isErrorModalShowState);

	return (
		<ChatLayout>
			<Messages messages={messages} />
			<Input message={message} setMessage={setMessage} />
			{isErrorModalShow && <ErrorModal />}
		</ChatLayout>
	);
};

export default Chat;
