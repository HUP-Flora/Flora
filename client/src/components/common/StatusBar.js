import { StatusBarDiv } from "../../styles/bar/BarStyle";
import { leftArrow } from "../../assets/arrow/leftArrow.png";

export function StatusBar() {
	return (
		<StatusBarDiv>
			<img src={leftArrow} alt={leftArrow} />
		</StatusBarDiv>
	);
}
