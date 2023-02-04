<<<<<<< HEAD
import { LeftArrow, StatusBarDiv, StatusBarText } from "../../styles/bar/BarStyle";
import leftArrowImg from "../../assets/arrow/LeftArrow.png";

export function StatusBar({ padding, text }) {
	return (
		<StatusBarDiv padding={padding}>
			<LeftArrow src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText size="19">{text}</StatusBarText>
		</StatusBarDiv>
=======
import { LeftArrow, StatusBarContainer, StatusBarText } from "../../styles/common/StatusBarStyle";
import leftArrowImg from "../../assets/arrow/leftArrow.png";
import { useNavigate } from "react-router-dom";

function StatusBar({ text }) {
	const navigate = useNavigate();

	return (
		<StatusBarContainer>
			<LeftArrow onClick={() => navigate(-1)} src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText>{text}</StatusBarText>
		</StatusBarContainer>
>>>>>>> f86a9c2bd2f75d487e593922174f8209d10228e8
	);
}

export default StatusBar;
