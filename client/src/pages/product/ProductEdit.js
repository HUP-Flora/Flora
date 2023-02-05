import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";

function ProductEdit(props) {
	return (
		<>
			<StatusBar text="상품 수정" />
			<ProductForm />
			<ProductAddBottomButtons type="edit" />
		</>
	);
}

export default ProductEdit;
