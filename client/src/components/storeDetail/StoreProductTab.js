import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../../recoil/storeDetail";

import { useProductsApi } from "../../hooks/useStoreApi";

import StoreTabEmpty from "./StoreTabEmpty";

import {
	ProductsContainer,
	ProductContainer,
	ProductImageWrapper,
	ProductName,
	ProductPrice,
} from "../../styles/storeDetail/StoreProductTabStyle";

import productImgSrc from "../../assets/store.png";

function StoreProductTab(props) {
	const navigate = useNavigate();

	const [products, setProducts] = useRecoilState(productsState);

	const productsApi = useProductsApi();

	// 더미 데이터
	const sId = 8;

	useEffect(() => {
		productsApi(sId);
	}, []);

	return (
		<ProductsContainer>
			{products.length === 0 ? (
				<StoreTabEmpty type="product" />
			) : (
				products.map(product => (
					<ProductContainer onClick={() => navigate("/productDetail")}>
						<ProductImageWrapper>
							<img src={product?.pImg} alt="product-img" />
						</ProductImageWrapper>
						<ProductName>{product?.name}</ProductName>
						<ProductPrice>{product?.price}원</ProductPrice>
					</ProductContainer>
				))
			)}
		</ProductsContainer>
	);
}

export default StoreProductTab;
