import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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

	const [products, setProducts] = useState([]);

	// 더미 데이터
	const sId = "0000000";

	useEffect(() => {
		// const response = axios.get(`/api/stores/${sId}/products?page=0&size=5`);

		const response = [
			{
				pId: 111111,
				name: "장미 꽃다발",
				desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
				price: 15000,
				img: { productImgSrc },
			},
			{
				pId: 111111,
				name: "장미 꽃다발",
				desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
				price: 15000,
				img: { productImgSrc },
			},
			{
				pId: 111111,
				name: "장미 꽃다발",
				desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
				price: 15000,
				img: { productImgSrc },
			},
		];

		// setProducts(response.data);
		setProducts(response);
	}, []);

	return (
		<ProductsContainer>
			{products.length === 0 ? (
				<StoreTabEmpty type="product" />
			) : (
				products.map(product => (
					<ProductContainer onClick={() => navigate("/productDetail")}>
						{/* 제품 사진 */}
						<ProductImageWrapper>
							<img src={product?.img?.productImgSrc} alt="product-img" />
						</ProductImageWrapper>
						{/* 제품명 */}
						<ProductName>{product?.name}</ProductName>
						{/* 제품 가격 */}
						<ProductPrice>{product?.price}원</ProductPrice>
					</ProductContainer>
				))
			)}
		</ProductsContainer>
	);
}

export default StoreProductTab;
