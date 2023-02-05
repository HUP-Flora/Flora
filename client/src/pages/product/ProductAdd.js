import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";

function ProductAdd(props) {
	return (
		<>
			<StatusBar text="상품 등록" />
			<ProductForm />
			<ProductAddBottomButtons type="add" />
		</>
	);
}

export default ProductAdd;
