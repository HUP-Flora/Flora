import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	giftCardState,
	isErrorModalShowState,
	isSubmitState,
	orderTypeState,
	paymentAmountState,
	sendUserPhoneState,
	sendUserState,
} from "../../../../../recoil/chatting";
import { sendThirdPickUpFormMessage } from "../../../../../utils/chatting";
import {
	ErrorMessage,
	FormContent,
	FormHeaderContainer,
	FormTime,
	FormWrapper,
	GiftMessageInput,
	InputCounter,
	InputCounterContainer,
	InputLabel,
	MarginBottom16TextInput,
	SubmitPaymentButton,
	TextInput,
} from "../../../../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import useInputValidate from "../../../../../hooks/useInputValidate";
import useChattingAPI from "../../../../../hooks/useChattingAPI";
import { useParams } from "react-router-dom";
import { LpaymentAmountState } from "../../../../../recoil/flolive";

function SecondPickUpForm({ time }) {
	const [orderType, setOrderType] = useRecoilState(orderTypeState);
	const [sendUser, setSendUser] = useRecoilState(sendUserState);
	const [sendUserPhone, setSendUserPhone] = useRecoilState(sendUserPhoneState);
	const [giftCard, setGiftCard] = useRecoilState(giftCardState);
	const [paymentAmount, setPaymentAmount] = useRecoilState(paymentAmountState);
	const setIsErrorModalShow = useSetRecoilState(isErrorModalShowState);
	const setIsSubmit = useSetRecoilState(isSubmitState);

	const LpaymentAmount = useRecoilValue(LpaymentAmountState);

	const { oId } = useParams();

	useEffect(() => {
		setOrderType("PICKUP");
	}, [setOrderType]);

	const phoneValidate = target => {
		target.value = target.value
			.replace(/[^0-9]/g, "")
			.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
			.replace(/(-{1,2})$/g, "");
		setSendUserPhone(target.value);
	};

	const isNotEmpty = value => value.trim() !== "";

	const { hasError: VsendUserHasError, toggleHasError: VsendUserToggleHasError } =
		useInputValidate(isNotEmpty);

	const { hasError: VsendUserPhoneHasError, toggleHasError: VsendUserPhoneToggleHasError } =
		useInputValidate(isNotEmpty);

	const reFormatPhoneNumber = phone => {
		return phone.replace(/-/g, "");
	};

	const { sendFormDataAPI } = useChattingAPI();
	const ThirdPickUpFormHandler = e => {
		const formData = [
			{ key: "sendUser", value: sendUser, toggleError: VsendUserToggleHasError },
			{ key: "sendUserPhone", value: sendUserPhone, toggleError: VsendUserPhoneToggleHasError },
		];

		for (const data of formData) {
			if (!isNotEmpty(data.value)) {
				data.toggleError();
				setIsErrorModalShow(true);
				return;
			}
		}
		setIsSubmit(true);

		const orederFormData = {
			type: orderType,
			orderer: sendUser,
			ordererPhoneNumber: reFormatPhoneNumber(sendUserPhone),
			recipient: null,
			receipientPhoneNumber: null,
			deliveryDestination: null,
			giftMessage: giftCard ? giftCard : null,
			payment: LpaymentAmount,
		};

		// console.log(orederFormData);
		sendFormDataAPI(orederFormData, oId);

		sendThirdPickUpFormMessage(e);
	};

	return (
		<>
			<FormWrapper>
				<FormHeaderContainer>픽업 주문</FormHeaderContainer>
				<FormContent>
					<InputLabel htmlFor="sendUser">보내는 분</InputLabel>
					<TextInput
						type="text"
						id="sendUser"
						placeholder="내용을 입력해주세요."
						onChange={e => {
							setSendUser(e.target.value);
						}}
						value={sendUser}
					/>
					<InputCounterContainer>
						{VsendUserHasError && <ErrorMessage>보내는 분을 입력해주세요.</ErrorMessage>}
						<InputCounter>{sendUser.length}/25자</InputCounter>
					</InputCounterContainer>
					<InputLabel htmlFor="sendUserPhone">보내는 분 전화번호</InputLabel>
					<MarginBottom16TextInput
						type="text"
						id="sendUserPhone"
						maxLength="13"
						placeholder="- 없이 입력해주세요."
						onChange={e => {
							phoneValidate(e.target);
						}}
						value={sendUserPhone}
						HasError={VsendUserPhoneHasError}
					/>
					{VsendUserPhoneHasError && <ErrorMessage>전화번호를 입력해주세요.</ErrorMessage>}
					<InputLabel htmlFor="giftCard">선물 카드 내용</InputLabel>
					<GiftMessageInput
						id="giftCard"
						placeholder="내용을 입력해주세요."
						onChange={e => setGiftCard(e.target.value)}
						value={giftCard}
					/>
					<InputCounter>{giftCard.length}/100자</InputCounter>
					<InputLabel htmlFor="paymentAmount">결제 금액</InputLabel>
					<TextInput
						type="text"
						id="paymentAmount"
						placeholder="내용을 입력해주세요."
						onChange={e => {
							setPaymentAmount(e.target.value);
						}}
						value={LpaymentAmount}
					/>
					{/*{VpaymentAmountHasError && <ErrorMessage>결제 금액을 입력해주세요.</ErrorMessage>}*/}
					<SubmitPaymentButton onClick={e => ThirdPickUpFormHandler(e)}>
						작성 완료
					</SubmitPaymentButton>
				</FormContent>
			</FormWrapper>
			<FormTime>{time}</FormTime>
		</>
	);
}

export default SecondPickUpForm;
