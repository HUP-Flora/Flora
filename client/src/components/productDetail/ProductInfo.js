import React from "react";

import StatusBar from "../../components/common/StatusBar";

import {
	ImageWrapper,
	Header,
	HrWrapper,
	DescriptionWrapper,
} from "../../styles/product/productDetail/ProductInfoStyle";
import { Text, BoldText, GrayHr } from "../../styles/common/CommonStyle";

import productImg from "../../assets/store.png";

function ProductInfo(props) {
	// 더미 데이터
	const product = {
		name: "새벽 하늘",
		price: 10000,
		description:
			"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid lorem ipsum dolor sit amet",
		img: { productImg },
	};
	return (
		<div>
			<StatusBar text="상품 상세" />
			<ImageWrapper>
				<img src={product.img.productImg} alt="" />
			</ImageWrapper>
			<Header>
				<BoldText size="23" font="nexon">
					{product.name}
				</BoldText>
				<Text>{product.price}원</Text>
			</Header>
			<HrWrapper>
				<GrayHr />
			</HrWrapper>
			<DescriptionWrapper>
				<Text font="nexon">{product.description}</Text>
			</DescriptionWrapper>
		</div>
	);
}

export default ProductInfo;
