import React from "react";
import deliveryButtonFormImage from "../../../../../assets/chatting/DeliveryButtonFormImage.png";
import pickUpButtonFormImage from "../../../../../assets/chatting/FirstFormPickUpImage.png";
import {
	sendSecondPickUpFormMessage,
	sendSecondDeliveryFormMessage,
} from "../../../../../utils/chatting";
import {
	SubmitButton,
	ButtonImage,
	FormText,
	FormContainer,
	FormTitle,
	FormTime,
} from "../../../../../styles/chatting/Messages/Message/forms/FistFormStyle";

function FirstForm({ time }) {
	return (
		<>
			<FormContainer>
				<FormTitle>
					상품을 어떻게
					<br />
					보내시겠어요?
				</FormTitle>
				<SubmitButton className="btn" onClick={e => sendSecondDeliveryFormMessage(e)}>
					<ButtonImage src={deliveryButtonFormImage} alt="deliveryButtonFormImage" />
					<FormText>배달로 보낼게요</FormText>
				</SubmitButton>
				<SubmitButton className="btn" onClick={e => sendSecondPickUpFormMessage(e)}>
					<ButtonImage src={pickUpButtonFormImage} alt="pickUpButtonFormImage" />
					<FormText>직접 가져갈게요</FormText>
				</SubmitButton>
			</FormContainer>
			<FormTime>{time}</FormTime>
		</>
	);
}

export default FirstForm;
