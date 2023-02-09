import { LeftArrow, StatusBarContainer, StatusBarText } from "../../styles/common/StatusBarStyle";
import leftArrowImg from "../../assets/arrow/LeftArrow.png";
import { useNavigate } from "react-router-dom";
import NoPaddingStatusBar from "./NoPaddingStatusBar";
import { PaddingX16 } from "../../styles/common/CommonStyle";
import { Padding16Container } from "../../styles/container/ContainerStyle";

export function StatusBar({ text }) {
	const navigate = useNavigate();

	return (
		<Padding16Container>
			<NoPaddingStatusBar text={text} />
		</Padding16Container>
	);
}

export default StatusBar;
