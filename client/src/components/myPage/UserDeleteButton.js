import React from "react";

import { Primary400Button } from "../../styles/button/ButtonStyle";
import { BottomButtonContainer } from "../../styles/common/CommonStyle";

function UerDeleteButton({ isChcked, setIsValid }) {
	const handleClick = () => {
		console.log(isChcked);

		// 유효성 검사
		if (isChcked === false) {
			setIsValid(false);
		} else {
			// (백) 탈퇴 request
			setIsValid(true);
		}
	};

	return (
		<BottomButtonContainer>
			<Primary400Button onClick={handleClick}>탈퇴하기</Primary400Button>
		</BottomButtonContainer>
	);
}

export default UerDeleteButton;
