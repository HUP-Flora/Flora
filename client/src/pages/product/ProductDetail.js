import React from "react";

import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductDetailButtons from "../../components/productDetail/ProductBottomButtons";

function ProductDetail(props) {
	return (
		<>
			<ProductInfo />
			<ProductDetailButtons />
		</>
	);
}

export default ProductDetail;
