import React from "react";
import sendImage from "../../../assets/chatting/MessageSendImage.png";
import formImage from "../../../assets/chatting/FormImage.png";

import { useRecoilValue } from "recoil";
import { nameState } from "../../../recoil/chatting";
import { sendFormMessage, sendMessage } from "../../../utils/chatting";
import {
	FormButton,
	FormButtonImage,
	InputButton,
	InputButtonImage,
	InputLayout,
	InputText,
} from "../../../styles/chatting/input/InputStyle";

function Input({ message, setMessage }) {
	const name = useRecoilValue(nameState);

	// 여기서 사장인지 체크
	const isOwner = name === "사장";

	return (
		<InputLayout>
			<InputText
				type="text"
				placeholder="메시지를 입력하세요."
				value={message}
				isOwner={isOwner}
				onChange={event => setMessage(event.target.value)}
			/>
			{isOwner && (
				<FormButton onClick={e => sendFormMessage(e)}>
					<FormButtonImage src={formImage} alt="" />
				</FormButton>
			)}
			<InputButton onClick={e => sendMessage(e, message, setMessage)}>
				<InputButtonImage src={sendImage} alt="#" />
			</InputButton>
		</InputLayout>
	);
}

export default Input;
