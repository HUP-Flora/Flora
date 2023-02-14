import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../../recoil/storeDetail";

import { useProductsApi } from "../../hooks/useProductsApi";

import StoreTabEmpty from "./StoreTabEmpty";

import { priceComma } from "../../hooks/priceComma";

import {
	ProductsContainer,
	ProductContainer,
	ProductImageWrapper,
	ProductName,
	ProductPrice,
} from "../../styles/storeDetail/StoreProductTabStyle";

import defaultImg from "../../assets/default-flower.png";

function StoreProductTab({ sId }) {
	const navigate = useNavigate();

	const [products, setProducts] = useRecoilState(productsState);

	const productsApi = useProductsApi();

	useEffect(() => {
		productsApi(sId);
	}, []);

	return (
		<ProductsContainer>
			{products.length === 0 ? (
				<StoreTabEmpty type="product" />
			) : (
				products.map((product, index) => (
					<ProductContainer key={index} onClick={() => navigate(`product/${product.pid}`)}>
						<ProductImageWrapper>
							<img
								src={product?.pimg?.split("-")[10] === "null.png" ? defaultImg : product?.pimg}
								alt="product-img"
							/>
						</ProductImageWrapper>
						<ProductName>{product?.name}</ProductName>
						<ProductPrice>{priceComma(product?.price)}원</ProductPrice>
					</ProductContainer>
				))
			)}
		</ProductsContainer>
	);
}

export default StoreProductTab;
