import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import StatusBar from "../../components/common/StatusBar";
import { storeBrnState } from "../../recoil/signup";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { SignupLabelDiv, SignupTextInput } from "../../styles/chatting/input/InputStyle";
import {
	ErrorMessage,
	InputLabel,
} from "../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import { BoldText, WhiteLayout } from "../../styles/common/CommonStyle";

export function SignupOwner() {
	const navigate = useNavigate();
	const [brn, setBrn] = useRecoilState(storeBrnState);
	const [brnErrorMessage, setBrnErrorMessage] = useState("");

	const handleSignup = () => {
		if (brnValidate(brn)) {
			navigate("/signup/owner/store");
		}
	};

	const activeEnter = e => {
		if (e.key === "Enter") {
			handleSignup();
		}
	};

	const brnHandler = useCallback(
		target => {
			target.value = target.value
				.replace(/[^0-9]/g, "")
				.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3")
				.replace(/(-{1,2})$/g, "");
			setBrnErrorMessage("");
			setBrn(target.value);
		},
		[setBrn]
	);

	const brnValidate = brn => {
		if (!brn.trim()) {
			setBrnErrorMessage("사업자 등록 번호를 입력해주세요.");
			return false;
		} else if (brn.length < 10 || !brnValidateFunction(brn)) {
			setBrnErrorMessage("유효하지 않은 사업자 등록 번호입니다. 다시 작성해주세요.");
			return false;
		} else {
			setBrnErrorMessage("");
			return true;
		}
	};

	const brnValidateFunction = brn => {
		const validateBrn = brn.replace(/-/g, "");
		console.log(validateBrn);
		const validateArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
		let sum_val = 0;
		for (let i = 0; i < 9; i++) {
			sum_val += Number(validateBrn[i]) * validateArr[i];
		}
		sum_val += parseInt((Number(validateBrn[validateBrn.length - 2]) * 5) / 10);
		const validateNum = 10 - (sum_val % 10);

		return validateNum === Number(validateBrn[validateBrn.length - 1]);
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
					<InputLabel htmlFor="brn">사업자 등록 번호를 입력해주세요</InputLabel>
				</SignupLabelDiv>
				<SignupTextInput
					type="text"
					id="brn"
					maxLength="12"
					placeholder="&nbsp;&nbsp;사업자 등록 번호를 입력해주세요"
					onChange={e => {
						brnHandler(e.target);
					}}
					// onFocus={e => VsendUserPhoneChangeFalseIsTouched(e)}
					onBlur={e => {
						brnValidate(e.target.value);
					}}
					onKeyDown={e => activeEnter(e)}
					value={brn}
					HasError={brnErrorMessage}
				/>
				{brnErrorMessage && <ErrorMessage>{brnErrorMessage}</ErrorMessage>}
				<ButtonToolBar>
					<Primary400LargeButton onClick={handleSignup}>다음으로</Primary400LargeButton>
				</ButtonToolBar>
			</WhiteLayout>
		</>
	);
}
