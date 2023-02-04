import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { BoldText, Text, WhiteLayout } from "../../styles/common/CommonStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import StatusBar from "../../components/common/StatusBar";

export function SignupUser() {
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
				<Text bottom="8">닉네임을 입력해주세요</Text>
				<input />
				<Text top="32" bottom="8">
					전화번호를 입력해주세요
				</Text>
				<input />
				<ButtonToolBar>
					<Primary400LargeButton>가입 완료하기</Primary400LargeButton>
				</ButtonToolBar>
			</WhiteLayout>
		</>
	);
}
