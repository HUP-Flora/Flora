import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductAddForm from "../../components/productAdd/ProductAddForm";
import ProductAddBottomButtons from "../../components/productAdd/ProductAddBottomButtons";

function ProductAdd(props) {
	return (
		<>
			<StatusBar text="상품 등록" />
			<ProductAddForm />
			<ProductAddBottomButtons />
		</>
	);
}

export default ProductAdd;
