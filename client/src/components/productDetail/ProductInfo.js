import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { productState } from "../../recoil/productForms";

import { useProductDetailApi } from "../../hooks/useProductDetailApi";

import StatusBar from "../common/StatusBar";

import {
	ImageWrapper,
	Header,
	HrWrapper,
	DescriptionWrapper,
} from "../../styles/product/productDetail/ProductInfoStyle";
import { Text, BoldText, GrayHr } from "../../styles/common/CommonStyle";

import defaultImg from "../../assets/default-flower.png";
import NoPaddingStatusBar from "../common/NoPaddingStatusBar";

function ProductInfo({ pId }) {
	const [product, setProduct] = useRecoilState(productState);

	const productDetailApi = useProductDetailApi();

	useEffect(() => {
		productDetailApi(pId);
	}, []);

	return (
		<div>
			<NoPaddingStatusBar text="상품 상세" />
			<ImageWrapper>
				<img
					src={product?.pimg?.split("-")[10] === "null.png" ? defaultImg : product?.pimg}
					alt="product-img"
				/>
			</ImageWrapper>
			<Header>
				<BoldText size="23" font="nexon">
					{product?.name}
				</BoldText>
				<Text>{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
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
