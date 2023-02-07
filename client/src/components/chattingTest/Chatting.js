import { useState, useEffect } from "react";

import Input from "./input/Input";
import Messages from "./messages/Messages";

import { useRecoilValue } from "recoil";
import { isErrorModalShowState, nameState, roomState } from "../../recoil/chatting";
import { listenMessage, socketInit, socketJoin } from "../../utils/chatting";
import { ChatLayout } from "../../styles/chattingTest/ChattingStyle";
import ErrorModal from "./errorModal/ErrorModal";

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
	const name = useRecoilValue(nameState);
	const room = useRecoilValue(roomState);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	socketInit();

	useEffect(() => {
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
