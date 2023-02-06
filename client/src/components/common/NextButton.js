import { NextButtonContainer } from "../../styles/common/NextButtonStyle";

function NextButtonStyle({text, onClick, isNotFixed}) {

	return (
		<NextButtonContainer isNotFixed={isNotFixed} onClick={onClick}>
			{text}
		</NextButtonContainer>
	);
}

export default NextButtonStyle;