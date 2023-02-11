import React from "react";
import { useParams } from "react-router-dom";

import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductBottomButtons from "../../components/productDetail/ProductBottomButtons";

function ProductDetail(props) {
	let { storetId } = useParams();
	let { productId } = useParams();

	return (
		<>
			<ProductInfo pId={productId} />
			<ProductBottomButtons pId={productId} sId={storetId} />
		</>
	);
}

export default ProductDetail;
