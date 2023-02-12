import React from "react";
import { useParams } from "react-router-dom";

import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductBottomButtons from "../../components/productDetail/ProductBottomButtons";

function ProductDetail(props) {
	const { sId, pId } = useParams();

	return (
		<>
			<ProductInfo pId={pId} />
			<ProductBottomButtons pId={pId} sId={sId} />
		</>
	);
}

export default ProductDetail;
