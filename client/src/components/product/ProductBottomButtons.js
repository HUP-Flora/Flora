import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SetRecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { nameState, productState } from "../../recoil/productForms";
import { storeImageFileState, storeImagePreviewState } from "../../recoil/signup";

import { useProductAddApi } from "../../hooks/useProductAddApi";
import { useProductEditApi } from "../../hooks/useProductEditApi";

import { BottomDoubleButtonContainer } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";
// import { defaultAriaLiveMessages } from "react-select/dist/declarations/src/accessibility";

import defaultImage from "../../assets/default-flower.png";

function ProductAddBottomButtons({
	type,
	sId,
	pId,
	setNameValidMessage,
	setPriceValidMessage,
	setDescriptionValidMessage,
	setPictureValidMessage,
}) {
	const navigate = useNavigate();

	const [product, setProduct] = useRecoilState(productState);
	const resetProduct = useResetRecoilState(productState);
	const [imageFile, setImageFile] = useRecoilState(storeImageFileState);
	const resetImageFile = useResetRecoilState(storeImageFileState);
	const setImagePreview = useResetRecoilState(storeImagePreviewState);

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

	const isPictureValid = () => {
		if (imageFile === "") {
			setPictureValidMessage("상품 사진을 추가해주세요.");
			return false;
		} else {
			setPictureValidMessage("");
			return true;
		}
	};

	const handleClickSubmit = () => {
		setNameValidMessage("");
		setPriceValidMessage("");
		setDescriptionValidMessage("");

		if (isPictureValid() && isNameValid() && isPriceValid() && isDescriptionValid()) {
			// 유효성 검사 통과
			if (type === "add") {
				const data = {
					name: product?.name,
					desc: product?.desc,
					price: product?.price?.replace(/,/g, ""),
				};

				const formData = new FormData();

				// if (imageFile === "") {
				// 	const file = new File(["null"], "null.png", {});
				// 	formData.append("file", file);
				// } else {
				formData.append("file", imageFile);
				// }

				formData.append(
					"productReq",
					new Blob([JSON.stringify(data)], { type: "application/json" })
				);

				productAddApi(sId, formData);
			} else if (type === "edit") {
				const data = {
					name: product?.name,
					desc: product?.desc,
					price: product?.price?.replace(/,/g, ""),
				};

				const formData = new FormData();

				if (imageFile === "") {
					const file = new File(["null"], "null.png", {});
					formData.append("file", file);
				} else {
					formData.append("file", imageFile);
				}

				formData.append(
					"productReq",
					new Blob([JSON.stringify(data)], { type: "application/json" })
				);

				productEditApi(sId, pId, formData);
			}
		}
	};

	const handleClickCancel = () => {
		resetProduct();
		resetImageFile();
		setImagePreview("");

		// navigate(`/store/${sId}/product/${pId}`);
		navigate(-1);
	};

	return (
		<BottomDoubleButtonContainer>
			<Primary400Button onClick={handleClickSubmit}>완료하기</Primary400Button>
			<Primary50Button onClick={handleClickCancel}>취소하기</Primary50Button>
		</BottomDoubleButtonContainer>
	);
}

export default ProductAddBottomButtons;
