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

	const ArrowClickHandler = () => {
		if (text === "꽃집 검색") {
			navigate("/");
		} else {
			navigate(-1);
		}
	};

	return (
		<StatusBarPadding16Container>
			<LeftArrow onClick={ArrowClickHandler} src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText>{text}</StatusBarText>
		</StatusBarPadding16Container>
	);
}

export default NoPaddingStatusBar;
