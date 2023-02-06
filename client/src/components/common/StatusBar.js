import { LeftArrow, StatusBarContainer, StatusBarText } from "../../styles/common/StatusBarStyle";
import leftArrowImg from "../../assets/arrow/LeftArrow.png";
import { useNavigate } from "react-router-dom";

export function StatusBar({ text }) {
	const navigate = useNavigate();

	return (
		<StatusBarContainer>
			<LeftArrow onClick={() => navigate(-1)} src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText>{text}</StatusBarText>
		</StatusBarContainer>
	);
}

export default StatusBar;
