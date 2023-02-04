import { LeftArrow, StatusBarDiv, StatusBarText } from "../../../styles/bar/BarStyle";
import leftArrowImg from "../../../assets/arrow/leftArrow.png";

export function StatusBar({ text }) {
	return (
		<StatusBarDiv>
			<LeftArrow src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText size="19">{text}</StatusBarText>
		</StatusBarDiv>
	);
}
