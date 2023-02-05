import React from "react";
import { useNavigate } from "react-router-dom";

import { BottomDoubleButtonContainer } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

function ProductAddBottomButtons({ type }) {
	const navigate = useNavigate();

	const handleClickSubmit = () => {
		if (type === "add") {
			console.log("상품 등록");
		} else if (type === "edit") {
			console.log("상품 수정");
		}
	};

	const handleClickCancle = () => {
		if (type === "add") {
			navigate("/store");
		} else if (type === "edit") {
			navigate("/productDetail");
		}
	};

	return (
		<BottomDoubleButtonContainer>
			<Primary400Button onClick={handleClickSubmit}>완료하기</Primary400Button>
			<Primary50Button onClick={handleClickCancle}>취소하기</Primary50Button>
		</BottomDoubleButtonContainer>
	);
}

export default ProductAddBottomButtons;
