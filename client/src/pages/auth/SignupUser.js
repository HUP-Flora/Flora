import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { BoldText, Text, WhiteLayout } from "../../styles/common/CommonStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import StatusBar from "../../components/common/StatusBar";
import {
	ErrorMessage,
	InputCounter,
	InputCounterContainer,
	InputLabel,
	MarginBottom16TextInput,
	TextInput,
} from "../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import { useRecoilState } from "recoil";
import { nicknameState, phoneNumberState } from "../../recoil/signup";
import { useCallback, useState } from "react";
import { SignupLabelDiv, SignupTextInput } from "../../styles/chatting/input/InputStyle";
import { useUserFormApi } from "../../hooks/useUserFormApi";

export function SignupUser() {
	const [nickname, setNickname] = useRecoilState(nicknameState);
	const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
	const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
	const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

	const userFormApi = useUserFormApi();

	const handleSignup = () => {
		if (nicknameValidate(nickname) && phoneNumberValidate(phoneNumber)) {
			const data = {
				nickname,
				phoneNumber,
			};

			// 서버로 보내고 이전에 가려했던 페이지로 이동
			userFormApi(data);
		}
	};

	const phoneNumberHandler = useCallback(
		target => {
			target.value = target.value
				.replace(/[^0-9]/g, "")
				.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
				.replace(/(-{1,2})$/g, "");
			setPhoneNumberErrorMessage("");
			setPhoneNumber(target.value);
		},
		[setPhoneNumber]
	);

	const phoneNumberValidate = phoneNumber => {
		if (!phoneNumber.trim()) {
			setPhoneNumberErrorMessage("전화번호를 입력해주세요.");
			return false;
		} else if (phoneNumber.length < 12) {
			setPhoneNumberErrorMessage("잘못된 양식입니다. 다시 작성해주세요.");
			return false;
		} else {
			setPhoneNumberErrorMessage("");
			return true;
		}
	};

	const nicknameHandler = useCallback(
		target => {
			const Nname = target.value;
			setNickname(Nname);
			if (Nname) {
				nicknameValidate(Nname);
			}
		},
		[setNickname]
	);

	const nicknameValidate = nickname => {
		if (!nickname.trim()) {
			setNicknameErrorMessage("닉네임을 입력해주세요.");
			return false;
		} else if (nickname.length > 25) {
			setNicknameErrorMessage("닉네임은 25자 이하여야 합니다.");
			return false;
		} else {
			setNicknameErrorMessage("");
			return true;
		}
	};

	return (
		<>
			<StatusBar />
			<WhiteLayout>
				<BoldText size="28" top="62">
					추가 정보 입력이
				</BoldText>
				<BoldText size="28" top="16" bottom="112">
					필요합니다.
				</BoldText>
				<SignupLabelDiv>
					<InputLabel htmlFor="nickname">닉네임을 입력해주세요</InputLabel>
				</SignupLabelDiv>
				<SignupTextInput
					type="text"
					id="nickname"
					placeholder="&nbsp;&nbsp;닉네임을 입력해주세요"
					// onChange={e => {
					// 	setNickname(e.target.value);
					// }}
					// onFocus={e => VsendUserChangeFalseIsTouched(e)}
					onChange={e => {
						nicknameHandler(e.target);
					}}
					onBlur={e => {
						nicknameValidate(e.target.value);
					}}
					value={nickname}
					HasError={nicknameErrorMessage}
				/>
				<InputCounterContainer>
					{nicknameErrorMessage && <ErrorMessage>{nicknameErrorMessage}</ErrorMessage>}
					<InputCounter isError={nicknameErrorMessage}>{nickname.length}/25자</InputCounter>
				</InputCounterContainer>
				<SignupLabelDiv>
					<InputLabel htmlFor="phoneNumber">전화번호를 입력해주세요</InputLabel>
				</SignupLabelDiv>
				<SignupTextInput
					type="text"
					id="phoneNumber"
					maxLength="13"
					placeholder="&nbsp;&nbsp;- 없이 입력해주세요"
					onChange={e => {
						phoneNumberHandler(e.target);
					}}
					// onFocus={e => VsendUserPhoneChangeFalseIsTouched(e)}
					onBlur={e => {
						phoneNumberValidate(e.target.value);
					}}
					value={phoneNumber}
					HasError={phoneNumberErrorMessage}
				/>
				{phoneNumberErrorMessage && <ErrorMessage>{phoneNumberErrorMessage}</ErrorMessage>}
				<ButtonToolBar>
					<Primary400LargeButton onClick={handleSignup}>가입 완료하기</Primary400LargeButton>
				</ButtonToolBar>
			</WhiteLayout>
		</>
	);
}
