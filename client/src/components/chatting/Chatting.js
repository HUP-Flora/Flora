import { useState, useEffect } from "react";

import Input from "./input/Input";
import Messages from "./messages/Messages";

import { useRecoilState, useRecoilValue } from "recoil";
import { isErrorModalShowState } from "../../recoil/chatting";
import { listenMessage, socketInit, socketJoin } from "../../utils/chatting";
import { ChatLayout } from "../../styles/chatting/ChattingStyle";
import ErrorModal from "./errorModal/ErrorModal";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";
import { userType } from "../../utils/user";

const ENDPOINT = "http://localhost:5000";

const Chat = ({myType, mySessionId}) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const [LmyType, setLmyType] = useRecoilState(LmyTypeState);
	const [LmySessionId, setLmySessionId] = useRecoilState(LmySessionIdState);

	socketInit();

	useEffect(() => {
		console.log("myType", myType);
		console.log("mySessionId", mySessionId);
		socketJoin(LmyType, LmySessionId);
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
