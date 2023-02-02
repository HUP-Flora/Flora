import React, { useEffect, useState } from "react";
import useInputValidate from "../../../../../hooks/use-inputValidate";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	giftCardState,
	isDaumPostShowState,
	isErrorModalShowState,
	isSubmitState,
	paymentAmountState,
	receiveUserFirstAddressState,
	receiveUserPhoneState,
	receiveUserSecondAddressState,
	receiveUserState,
	sendUserPhoneState,
	sendUserState,
} from "../../../../../recoil/chatting";
import { sendThirdDeliveryFormMessage } from "../../../../../utils/chatting";
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
	SearchAddressContainerButton,
	SearchAddressInput,
	SubmitPaymentButton,
	TextInput,
} from "../../../../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import PostcodeModal from "../../../../common/PostcodeModal";

function SecondDeliveryForm({ time }) {
	const [sendUser, setSendUser] = useRecoilState(sendUserState);
	const [sendUserPhone, setSendUserPhone] = useRecoilState(sendUserPhoneState);
	const [receiveUser, setReceiveUser] = useRecoilState(receiveUserState);
	const [receiveUserPhone, setReceiveUserPhone] = useRecoilState(receiveUserPhoneState);
	const [receiveUserFirstAddress, setReceiveUserFirstAddress] = useRecoilState(
		receiveUserFirstAddressState
	);
	const [receiveUserSecondAddress, setReceiveUserSecondAddress] = useRecoilState(
		receiveUserSecondAddressState
	);
	const [giftCard, setGiftCard] = useRecoilState(giftCardState);
	const [paymentAmount, setPaymentAmount] = useRecoilState(paymentAmountState);

	const setIsErrorModalShow = useSetRecoilState(isErrorModalShowState);
	const [isDaumPostShow, setIsDaumPostShow] = useRecoilState(isDaumPostShowState);
	const [isReceiveUserFistAddressHasError, setIsReceiveUserFistAddressHasError] = useState(false);
	const setIsSubmit = useSetRecoilState(isSubmitState);

	const phoneValidate = (target, type) => {
		target.value = target.value
			.replace(/[^0-9]/g, "")
			.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
			.replace(/(\-{1,2})$/g, "");
		if (type === "sendUserPhone") {
			setSendUserPhone(target.value);
		} else {
			setReceiveUserPhone(target.value);
		}
	};

	const isNotEmpty = value => value.trim() !== "";
	const {
		// 다른데서 value필요 없으면 지우면 됨
		value: VsendUser,
		hasError: VsendUserHasError,
		toggleHasError: VsendUserToggleHasError,
	} = useInputValidate(isNotEmpty);

	const { hasError: VsendUserPhoneHasError, toggleHasError: VsendUserPhoneToggleHasError } =
		useInputValidate(isNotEmpty);

	const {
		hasError: VreceiveUserHasError,
		valueChangeHandler: VreceiveUserChangeHandler,
		inputBlurHandler: VreceiveUserBlurHandler,
		toggleHasError: VreceiveUserToggleHasError,
	} = useInputValidate(isNotEmpty);

	const {
		hasError: VreceiveUserPhoneHasError,
		valueChangeHandler: VreceiveUserPhoneChangeHandler,
		inputBlurHandler: VreceiveUserPhoneBlurHandler,
		toggleHasError: VreceiveUserPhoneToggleHasError,
	} = useInputValidate(isNotEmpty);

	const {
		hasError: VpaymentAmountHasError,
		valueChangeHandler: VpaymentAmountChangeHandler,
		inputBlurHandler: VpaymentAmountBlurHandler,
		toggleHasError: VpaymentAmountToggleHasError,
	} = useInputValidate(isNotEmpty);

	const ThirdDeliveryFormHandler = e => {
		const formData = [
			{ key: "sendUser", value: sendUser, toggleError: VsendUserToggleHasError },
			{ key: "sendUserPhone", value: sendUserPhone, toggleError: VsendUserPhoneToggleHasError },
			{ key: "receiveUser", value: receiveUser, toggleError: VreceiveUserToggleHasError },
			{
				key: "receiveUserPhone",
				value: receiveUserPhone,
				toggleError: VreceiveUserPhoneToggleHasError,
			},
			{ key: "paymentAmount", value: paymentAmount, toggleError: VpaymentAmountToggleHasError },
		];

		for (const data of formData) {
			if (!isNotEmpty(data.value)) {
				data.toggleError();
				setIsErrorModalShow(true);
				return;
			}
		}

		if (!isNotEmpty(receiveUserFirstAddress)) {
			setIsReceiveUserFistAddressHasError(true);
			setIsErrorModalShow(true);
			return;
		}
		setIsSubmit(true);
		sendThirdDeliveryFormMessage(e);
	};

	useEffect(() => {
		if (isNotEmpty(receiveUserFirstAddress)) {
			setIsReceiveUserFistAddressHasError(false);
		}
	}, [receiveUserFirstAddress]);

	const daumPostHandler = e => {
		setIsDaumPostShow(true);
	};

	const formatFistAddress = firstAddress => {
		if (firstAddress.length > 14) {
			return firstAddress.slice(0, 14) + "...";
		} else {
			return firstAddress;
		}
	};

	return (
		<>
			{isDaumPostShow && <PostcodeModal />}
			<FormWrapper>
				<FormHeaderContainer>배달 주문</FormHeaderContainer>
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
						HasError={VsendUserHasError}
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
							phoneValidate(e.target, "sendUserPhone");
						}}
						value={sendUserPhone}
						HasError={VsendUserPhoneHasError}
					/>
					{VsendUserPhoneHasError && <ErrorMessage>전화번호를 입력해주세요.</ErrorMessage>}
					<InputLabel htmlFor="receiveUser">받는 분</InputLabel>
					<TextInput
						type="text"
						id="receiveUser"
						placeholder="내용을 입력해주세요."
						onChange={e => {
							setReceiveUser(e.target.value);
							VreceiveUserChangeHandler(e);
						}}
						value={receiveUser}
						onBlur={VreceiveUserBlurHandler}
						HasError={VreceiveUserHasError}
					/>
					<InputCounterContainer>
						{VreceiveUserHasError && <ErrorMessage>받는 분을 입력해주세요.</ErrorMessage>}
						<InputCounter>{receiveUser.length}/25자</InputCounter>
					</InputCounterContainer>
					<InputLabel htmlFor="receiveUserPhone">받는 분 전화번호</InputLabel>
					<MarginBottom16TextInput
						type="text"
						id="receiveUserPhone"
						maxLength="13"
						placeholder="- 없이 입력해주세요."
						onChange={e => {
							phoneValidate(e.target, "receiveUserPhone");
							VreceiveUserPhoneChangeHandler(e);
						}}
						value={receiveUserPhone}
						onBlur={VreceiveUserPhoneBlurHandler}
						HasError={VreceiveUserPhoneHasError}
					/>
					{VreceiveUserPhoneHasError && <ErrorMessage>전화번호를 입력해주세요.</ErrorMessage>}
					<InputLabel htmlFor="receiveUserAddress">배송지</InputLabel>
					<SearchAddressContainerButton onClick={daumPostHandler}>
						<SearchAddressInput
							type="text"
							id="receiveUserAddress"
							placeholder="내용을 입력해주세요."
							disabled
							value={formatFistAddress(receiveUserFirstAddress)}
							HasError={isReceiveUserFistAddressHasError}
							onClick={e => daumPostHandler(e)}
						/>
					</SearchAddressContainerButton>
					{isReceiveUserFistAddressHasError && <ErrorMessage>배송지를 입력해주세요.</ErrorMessage>}
					<MarginBottom16TextInput
						type="text"
						placeholder="상세 주소"
						onChange={e => setReceiveUserSecondAddress(e.target.value)}
						value={receiveUserSecondAddress}
					/>
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
							VpaymentAmountChangeHandler(e);
						}}
						value={paymentAmount}
						onBlur={VpaymentAmountBlurHandler}
						HasError={VpaymentAmountHasError}
					/>
					{VpaymentAmountHasError && <ErrorMessage>결제 금액을 입력해주세요.</ErrorMessage>}
					<SubmitPaymentButton
						onClick={e => {
							ThirdDeliveryFormHandler(e);
						}}
					>
						작성 완료
					</SubmitPaymentButton>
				</FormContent>
			</FormWrapper>
			<FormTime>{time}</FormTime>
		</>
	);
}

export default SecondDeliveryForm;
