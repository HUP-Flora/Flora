import React from "react";
import { useNavigate } from "react-router-dom";

import { BottomDoubleButtonContainer } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

function ProductAddBottomButtons({
	type,
	name,
	price,
	description,
	isValidName,
	isValidPrice,
	isValidDescription,
	setIsValidName,
	setIsValidPrice,
	setIsValidDescription,
}) {
	const navigate = useNavigate();

	const handleClickSubmit = () => {
		if (name === "") {
			setIsValidName(false);
		} else {
			setIsValidName(true);
		}
		// 숫자만 입력 가능
		if (price === "" || isNaN(price)) {
			setIsValidPrice(false);
		} else {
			setIsValidPrice(true);
		}
		if (description === "") {
			setIsValidDescription(false);
		} else {
			setIsValidDescription(true);
		}

		if (isValidName && isValidPrice && isValidDescription) {
			// 유효성 검사 통과
			// (백) request
			if (type === "add") {
				console.log("상품 등록");
			} else if (type === "edit") {
				console.log("상품 수정");
			}

			navigate("/productDetail");
		}
	};

	const handleClickCancel = () => {
		if (type === "add") {
			navigate("/store/detail");
		} else if (type === "edit") {
			navigate("/productDetail");
		}
	};

	return (
		<BottomDoubleButtonContainer>
			<Primary400Button onClick={handleClickSubmit}>완료하기</Primary400Button>
			<Primary50Button onClick={handleClickCancel}>취소하기</Primary50Button>
		</BottomDoubleButtonContainer>
	);
}

export default ProductAddBottomButtons;
