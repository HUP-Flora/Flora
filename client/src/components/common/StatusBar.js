import { LeftArrow, StatusBarDiv, StatusBarText } from "../../styles/bar/BarStyle";
import leftArrowImg from "../../assets/arrow/LeftArrow.png";

export function StatusBar({ padding, text }) {
	return (
		<StatusBarDiv padding={padding}>
			<LeftArrow src={leftArrowImg} alt={leftArrowImg} />
			<StatusBarText size="19">{text}</StatusBarText>
		</StatusBarDiv>
	);
}
