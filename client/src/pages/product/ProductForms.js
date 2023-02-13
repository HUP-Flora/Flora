import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { storeImageFileState, storeImagePreviewState } from "../../recoil/signup";

import { productState } from "../../recoil/productForms";

import { useProductDetailApi } from "../../hooks/useProductDetailApi";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";

function ProductForms() {
	const location = useLocation();
	const { sId, pId } = useParams();

	const [product, setProduct] = useRecoilState(productState);
	const resetProduct = useResetRecoilState(productState);

	const [nameValidMessage, setNameValidMessage] = useState(true);
	const [priceValidMessage, setPriceValidMessage] = useState(true);
	const [pictureValidMessage, setPictureValidMessage] = useState("");
	const [descriptionValidMessage, setDescriptionValidMessage] = useState(true);

	const productDetailApi = useProductDetailApi();
	const setImagePreview = useSetRecoilState(storeImagePreviewState);
	const path = location.pathname.split("/");
	const type = path[path.length - 1];

	// useEffect(() => {
	// 	resetProduct();
	// }, []);

	useEffect(() => {
		if (pId) {
			productDetailApi(pId);
		} else {
			const reset = () => {
				resetProduct();
				setImagePreview("");
			};

			reset();
		}
	}, []);

	return (
		<>
			<NoPaddingStatusBar text={type === "add" ? "상품 등록" : "상품 수정"} />
			<ProductForm
				nameValidMessage={nameValidMessage}
				priceValidMessage={priceValidMessage}
				descriptionValidMessage={descriptionValidMessage}
				pictureValidMessage={pictureValidMessage}
			/>
			<ProductAddBottomButtons
				type={type}
				sId={sId}
				pId={pId}
				setNameValidMessage={setNameValidMessage}
				setPriceValidMessage={setPriceValidMessage}
				setDescriptionValidMessage={setDescriptionValidMessage}
				setPictureValidMessage={setPictureValidMessage}
			/>
		</>
	);
}

export default ProductForms;
