import React, { useEffect, useState } from "react";

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
	const [product, setProduct] = useState(props.product);

	// 더미 데이터
	const pId = 1111111;

	useEffect(() => {
		// const response = axios.get(`/api/products/${pId}`);

		const response = {
			name: "lorem Ipsum",
			desc: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",

			price: 15000,
			iImg: { productImg },
		};

		// setProduct(response.data);
		setProduct(response);
	}, []);

	return (
		<div>
			<StatusBar text="상품 상세" />
			<ImageWrapper>
				<img src={product?.iImg?.productImg} alt="" />
			</ImageWrapper>
			<Header>
				<BoldText size="23" font="nexon">
					{product?.name}
				</BoldText>
				<Text>{product?.price}원</Text>
			</Header>
			<HrWrapper>
				<GrayHr />
			</HrWrapper>
			<DescriptionWrapper>
				<Text font="nexon">{product?.desc}</Text>
			</DescriptionWrapper>
		</div>
	);
}

export default ProductInfo;
