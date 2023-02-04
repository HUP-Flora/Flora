import React from "react";
import { useNavigate } from "react-router-dom";

import { BottomDoubleButtonContainer } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

function ProductAddBottomButtons(props) {
	const navigate = useNavigate();

	const handleClickSubmit = () => {
		console.log();
	};

	const handleClickCancle = () => {
		navigate("/store");
	};

	return (
		<BottomDoubleButtonContainer>
			<Primary400Button onClick={handleClickSubmit}>완료하기</Primary400Button>
			<Primary50Button onClick={handleClickCancle}>취소하기</Primary50Button>
		</BottomDoubleButtonContainer>
	);
}

export default ProductAddBottomButtons;
