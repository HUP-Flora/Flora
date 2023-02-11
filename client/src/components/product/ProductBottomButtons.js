import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SetRecoilState, useRecoilState } from "recoil";
import { nameState, productState } from "../../recoil/productForms";

import { useProductAddApi, useProductEditApi } from "../../hooks/useProductApi";

import { BottomDoubleButtonContainer } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

function ProductAddBottomButtons({
	type,
	// name,
	// price,
	// description,
	setNameValidMessage,
	setPriceValidMessage,
	setDescriptionValidMessage,
}) {
	const navigate = useNavigate();

	const [product, setProduct] = useRecoilState(productState);

	const productAddApi = useProductAddApi();
	const productEditApi = useProductEditApi();

	const isNameValid = () => {
		if (product?.name === "") {
			setNameValidMessage("상품명을 입력해주세요.");
			return false;
		} else {
			setNameValidMessage("");
			return true;
		}
	};

	const isPriceValid = () => {
		// 숫자만 입력 가능
		if (product?.price === "") {
			setPriceValidMessage("가격을 입력해주세요.");
			return false;
		} else if (isNaN(product?.price.replace(/,/g, ""))) {
			setPriceValidMessage("숫자만 입력해주세요.");
			return false;
		} else {
			setPriceValidMessage("");
			return true;
		}
	};

	const isDescriptionValid = () => {
		if (product?.description === "") {
			setDescriptionValidMessage("상세 설명을 입력해주세요.");
			return false;
		} else {
			setDescriptionValidMessage("");
			return true;
		}
	};

	const handleClickSubmit = () => {
		setNameValidMessage("");
		setPriceValidMessage("");
		setDescriptionValidMessage("");

		if (isNameValid() && isPriceValid() && isDescriptionValid()) {
			// 유효성 검사 통과
			// (백) request
			if (type === "add") {
				console.log("상품 등록");
				productAddApi(product?.name, product?.price.replace(",", ""), product?.description);
			} else if (type === "edit") {
				console.log("상품 수정");
				// productEditApi(pId, product?.name, product?.price.replace(",", ""), product?.description);
			}
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
