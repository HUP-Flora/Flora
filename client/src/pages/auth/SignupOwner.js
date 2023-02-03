import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/common/StatusBar";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { BoldText } from "../../styles/common/CommonStyle";
import { WhiteContainer } from "../../styles/container/ContainerStyle";

export function SignupOwner() {
	const navigate = useNavigate();

	const handleSignup = () => {
		navigate("/signup/owner/store");
	};

	return (
		<WhiteContainer>
			<StatusBar />
			<BoldText size="28" top="62">
				추가 정보 입력이
			</BoldText>
			<BoldText size="28" top="16" bottom="112">
				필요합니다.
			</BoldText>
			<BoldText size="16" bottom="8">
				사업자 등록 번호를 입력해주세요
			</BoldText>
			<input />
			<ButtonToolBar>
				<Primary400LargeButton onClick={handleSignup}>다음으로</Primary400LargeButton>
			</ButtonToolBar>
		</WhiteContainer>
	);
}
