import React, { useEffect, useRef } from "react";
import { useOrderStates } from "../../../../../hooks/useOrderStates";
import {
	CheckAddress,
	FormContent,
	FormFooter,
	FormFooterMessage,
	FormFooterMessageContainer,
	FormHeaderContainer,
	FormTime,
	FormWrapper,
	GiftMessageInput,
	InputLabel,
	MarginBottom16TextInput,
	SubmitPaymentButton,
	TextInput,
} from "../../../../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderStatesState } from "../../../../../recoil/chatting";
import { KakaoPayment } from "../../../../../pages/kakaoPayment/KakaoPayment";
import { useParams } from "react-router-dom";
import { KakaoPaymentButtonSection } from "../../../../../styles/common/CommonStyle";
import { LpaymentAmountState } from "../../../../../recoil/flolive";
import { useFloliveExitApi } from "../../../../../hooks/useFloliveExitApi";

function ThirdDeliveryForm({ time }) {
	const { oId } = useParams();
	const textarea = useRef();
	const setOrderStates = useSetRecoilState(orderStatesState);
	const orderStates = useRecoilValue(orderStatesState);
	const LpaymentAmount = useRecoilValue(LpaymentAmountState);
	const { floliveExitApi } = useFloliveExitApi();

	const {
		type,
		sendUser,
		sendUserPhone,
		giftCard,
		paymentAmount,
		receiveUser,
		receiveUserPhone,
		receiveUserFirstAddress,
		receiveUserSecondAddress,
	} = useOrderStates();

	const sendUserPhoneNumber = sendUserPhone?.replace(/-/gi, "");
	const receiveUserPhoneNumber = receiveUserPhone?.replace(/-/gi, "");
	let receiveUserAddress;

	if (receiveUserSecondAddress) {
		receiveUserAddress = receiveUserFirstAddress + ", " + receiveUserSecondAddress;
	} else {
		receiveUserAddress = receiveUserFirstAddress;
	}

	useEffect(() => {
		textarea.current.style.height = "auto"; //height 초기화
		textarea.current.style.height = textarea.current.scrollHeight + "px";

		setOrderStates({
			type,
			sendUser,
			sendUserPhoneNumber,
			receiveUser,
			receiveUserPhoneNumber,
			receiveUserAddress,
			giftCard,
			paymentAmount,
		});
	}, [
		setOrderStates,
		type,
		sendUser,
		sendUserPhoneNumber,
		receiveUser,
		receiveUserPhoneNumber,
		receiveUserAddress,
		giftCard,
		paymentAmount,
	]);

	const numberWithCommas = x => {
		return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const LOpaymentAmount = numberWithCommas(LpaymentAmount);

	const paymentClickHandler = () => {
		floliveExitApi(oId);
	};

	return (
		<>
			<FormWrapper>
				<FormHeaderContainer>배달 주문 확인</FormHeaderContainer>
				<FormContent>
					<InputLabel htmlFor="sendUser">보내는 분</InputLabel>
					<TextInput type="text" id="sendUser" value={sendUser} disabled />
					<InputLabel htmlFor="sendUserPhone">보내는 분 전화번호</InputLabel>
					<MarginBottom16TextInput
						type="text"
						id="sendUserPhone"
						maxLength="13"
						value={sendUserPhone}
						disabled
					/>
					<InputLabel htmlFor="reciveUser">받는 분</InputLabel>
					<TextInput type="text" id="reciveUser" value={receiveUser} disabled />
					<InputLabel htmlFor="reciveUserPhone">받는 분 전화번호</InputLabel>
					<MarginBottom16TextInput
						type="text"
						id="reciveUserPhone"
						maxLength="13"
						value={receiveUserPhone}
						disabled
					/>
					<InputLabel>배송지</InputLabel>
					<CheckAddress>
						{receiveUserFirstAddress}, {receiveUserSecondAddress}
					</CheckAddress>
					<InputLabel htmlFor="giftCard">선물 카드 내용</InputLabel>
					<GiftMessageInput id="giftCard" ref={textarea} value={giftCard || "내용 없음"} disabled />
				</FormContent>
				<FormFooter>
					<FormFooterMessageContainer>
						<FormFooterMessage>결제 금액</FormFooterMessage>
						<FormFooterMessage>{LOpaymentAmount}원</FormFooterMessage>
					</FormFooterMessageContainer>
					<KakaoPaymentButtonSection onClick={paymentClickHandler} isPayment={true}>
						<KakaoPayment oId={oId} />
					</KakaoPaymentButtonSection>
					{/* <SubmitPaymentButton onClick={e => console.log(orderStates)}>
						결제하기
					</SubmitPaymentButton> */}
				</FormFooter>
			</FormWrapper>
			<FormTime>{time}</FormTime>
		</>
	);
}

export default ThirdDeliveryForm;
