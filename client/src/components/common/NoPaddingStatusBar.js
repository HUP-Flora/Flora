import {
	LeftArrow,
	StatusBarContainer,
	StatusBarPadding16Container,
	StatusBarText,
} from "../../styles/common/StatusBarStyle";
import leftArrowImg from "../../assets/arrow/LeftArrow.png";
import { useNavigate } from "react-router-dom";

export function NoPaddingStatusBar({ text }) {
	const navigate = useNavigate();

	return (
		<StatusBarPadding16Container>
			<LeftArrow onClick={() => navigate(-1)} src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText>{text}</StatusBarText>
		</StatusBarPadding16Container>
	);
}

export default NoPaddingStatusBar;
