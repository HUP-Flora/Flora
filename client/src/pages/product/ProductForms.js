import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { storeImageFileState } from "../../recoil/signup";

import { productState } from "../../recoil/productForms";

import { useProductDetailApi } from "../../hooks/useProductDetailApi";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";

function ProductForms(props) {
	const location = useLocation();
	const { storeId } = useParams();
	const { productId } = useParams();

	const [nameValidMessage, setNameValidMessage] = useState(true);
	const [priceValidMessage, setPriceValidMessage] = useState(true);
	const [descriptionValidMessage, setDescriptionValidMessage] = useState(true);

	const productDetailApi = useProductDetailApi();

	const path = location.pathname.split("/");
	const type = path[path.length - 1];

	useEffect(() => {
		if (type === "edit") {
			productDetailApi(productId);
		}
	}, []);

	return (
		<>
			<StatusBar text={type === "add" ? "상품 등록" : "상품 수정"} />
			<ProductForm
				nameValidMessage={nameValidMessage}
				priceValidMessage={priceValidMessage}
				descriptionValidMessage={descriptionValidMessage}
			/>
			<ProductAddBottomButtons
				type={type}
				sId={storeId}
				pId={productId}
				setNameValidMessage={setNameValidMessage}
				setPriceValidMessage={setPriceValidMessage}
				setDescriptionValidMessage={setDescriptionValidMessage}
			/>
		</>
	);
}

export default ProductForms;
