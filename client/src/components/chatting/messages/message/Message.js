import React from "react";
import FirstForm from "./forms/FirstForm";
import SecondDeliveryForm from "./forms/SecondDeliveryForm";
import ThirdDeliveryForm from "./forms/ThirdDeliveryForm";
import SecondPickUpForm from "./forms/SecondPickUpForm";
import ThirdPickUpForm from "./forms/ThirdPickUpForm";
import { useRecoilValue } from "recoil";
import {
	MessageText,
	MessageTime,
	MessageBox,
	MyMessageContainer,
	MyMessageTime,
	YourMessageContainer,
	YourMessageTime,
} from "../../../../styles/chatting/Messages/Message/MessageStyle";
import { LmyTypeState } from "../../../../recoil/flolive";

function Message({ message: { user, text, type, time } }) {
	const LmyType = useRecoilValue(LmyTypeState);
	const isSentByCurrentUser = user.trim().toLowerCase() === LmyType.trim().toLowerCase();
	console.log(user, LmyType, isSentByCurrentUser);

	return (
		<div>
			{isSentByCurrentUser && type === "message" && (
				<MyMessageContainer>
					<MessageTime>
						<MessageBox>
							<MessageText>{text}</MessageText>
						</MessageBox>
						<MyMessageTime>{time}</MyMessageTime>
					</MessageTime>
				</MyMessageContainer>
			)}
			{!isSentByCurrentUser && type === "message" && (
				<YourMessageContainer>
					<MessageTime>
						<MessageBox>
							<MessageText>{text}</MessageText>
						</MessageBox>
						<YourMessageTime>{`${new Date().getHours().toString().padStart(2, "0")}:${new Date()
							.getMinutes()
							.toString()
							.padStart(2, "0")}`}</YourMessageTime>
					</MessageTime>
				</YourMessageContainer>
			)}
			{type === "firstForm" && <FirstForm time={time} />}
			{type === "secondDeliveryForm" && <SecondDeliveryForm time={time} />}
			{type === "secondPickUpForm" && <SecondPickUpForm time={time} />}
			{type === "thirdPickUpForm" && <ThirdPickUpForm time={time} />}
			{type === "thirdDeliveryForm" && <ThirdDeliveryForm time={time} />}
		</div>
	);
}

export default Message;
