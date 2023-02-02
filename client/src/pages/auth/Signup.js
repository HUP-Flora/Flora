import { Primary400LargeButton, Primary50LargeButton } from "../../styles/button/ButtonStyle";
import {
	BoldText,
	GrayText,
	LargeButtonIcon,
	LargeButtonText,
} from "../../styles/common/CommonStyle";
import { WhiteContainer } from "../../styles/container/ContainerStyle";
import OwnerIcon from "../../assets/signup/ownerIcon.png";
import UserIcon from "../../assets/signup/userIcon.png";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
export function Signup() {
	return (
		<WhiteContainer>
			<BoldText font="nexon" size="28" top="102" bottom="24">
				당신은 누구신가요?
			</BoldText>
			<GrayText font="nexon" bottom="128">
				사용자 유형을 선택해주세요
			</GrayText>
			<Primary50LargeButton width="358" height="88" bottom="32">
				<LargeButtonIcon src={UserIcon} alt="userIcon" />
				<LargeButtonText>일반 사용자</LargeButtonText>
			</Primary50LargeButton>
			<Primary50LargeButton width="358" height="88">
				<LargeButtonIcon src={OwnerIcon} alt="userIcon" />
				<LargeButtonText>꽃집 사장님</LargeButtonText>
			</Primary50LargeButton>
			<ButtonToolBar>
				<Primary400LargeButton>다음으로</Primary400LargeButton>
			</ButtonToolBar>
		</WhiteContainer>
	);
}
