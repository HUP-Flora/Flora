import React from "react";

import {
	ProductsContainer,
	ProductContainer,
	ProductImageWrapper,
	ProductName,
	ProductPrice,
} from "../../styles/storeDetail/StoreProductTabStyle";

import productImgSrc from "../../assets/store.png";

function StoreProductTab(props) {
	// 더미 데이터
	const prouducts = [
		{
			productImg: productImgSrc,
			productName: "장미 꽃다발",
			// int
			productPrice: 10000,
		},
		{
			productImg: productImgSrc,
			productName: "장미 꽃다발",
			// int
			productPrice: 10000,
		},
		{
			productImg: productImgSrc,
			productName: "장미 꽃다발",
			// int
			productPrice: 10000,
		},
		{
			productImg: productImgSrc,
			productName: "장미 꽃다발",
			// int
			productPrice: 10000,
		},
		{
			productImg: productImgSrc,
			productName: "장미 꽃다발",
			// int
			productPrice: 10000,
		},
	];

	return (
		<ProductsContainer>
			{prouducts.map(product => (
				<ProductContainer>
					{/* 제품 사진 */}
					<ProductImageWrapper>
						<img src={product.productImg} alt="product-img" />
					</ProductImageWrapper>
					{/* 제품명 */}
					<ProductName>{product.productName}</ProductName>
					{/* 제품 가격 */}
					<ProductPrice>{product.productPrice}원</ProductPrice>
				</ProductContainer>
			))}
		</ProductsContainer>
	);
}

export default StoreProductTab;
