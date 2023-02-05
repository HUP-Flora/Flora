import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/productAdd/ProductForm";
import ProductAddBottomButtons from "../../components/productAdd/ProductAddBottomButtons";

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
