import React, { useEffect, useRef } from "react";
import {
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
import { useOrderStates } from "../../../../../hooks/useOrderStates";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderStatesState } from "../../../../../recoil/chatting";
import { KakaoPayment } from "../../../../../pages/kakaoPayment/KakaoPayment";
import { useParams } from "react-router-dom";

function ThirdPickUpForm({ time }) {
	const textarea = useRef();
	const setOrderStates = useSetRecoilState(orderStatesState);
	const orderStates = useRecoilValue(orderStatesState);
	const { oId } = useParams();

	const { type, sendUser, sendUserPhone, giftCard, paymentAmount } = useOrderStates();

	const sendUserPhoneNumber = sendUserPhone?.replace(/-/gi, "");

	useEffect(() => {
		textarea.current.style.height = "auto"; //height 초기화
		textarea.current.style.height = textarea.current.scrollHeight + "px";

		setOrderStates({
			type,
			sendUser,
			sendUserPhoneNumber,
			giftCard,
			paymentAmount,
		});
	}, [setOrderStates, type, sendUser, sendUserPhoneNumber, giftCard, paymentAmount]);

	const numberWithCommas = x => {
		return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const OpaymentAmount = numberWithCommas(paymentAmount);

	return (
		<>
			<FormWrapper>
				<FormHeaderContainer>픽업 주문 확인</FormHeaderContainer>
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
					<InputLabel htmlFor="giftCard">선물 카드 내용</InputLabel>
					<GiftMessageInput id="giftCard" ref={textarea} value={giftCard || "내용 없음"} disabled />
				</FormContent>
				<FormFooter>
					<FormFooterMessageContainer>
						<FormFooterMessage>결제 금액</FormFooterMessage>
						<FormFooterMessage>{OpaymentAmount}원</FormFooterMessage>
					</FormFooterMessageContainer>
					<KakaoPayment oId={oId} />
					{/* <SubmitPaymentButton onClick={e => console.log(orderStates)}>
						결제하기
					</SubmitPaymentButton> */}
				</FormFooter>
			</FormWrapper>
			<FormTime>{time}</FormTime>
		</>
	);
}

export default ThirdPickUpForm;
