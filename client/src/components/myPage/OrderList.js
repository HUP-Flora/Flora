import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReviewAddModal from "./ReviewAddModal";

import {
	Primary50SmallButton,
	Primary400SmallButton,
	WhiteSmallButton,
	GraySmallButton,
} from "../../styles/button/ButtonStyle";
import { Text, BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import {
	ShadowCardWrapper,
	TextContent,
	RowContainer,
} from "../../styles/myPage/MyPageOrderListStyle";

import image from "../../assets/store.png";

function OrderList(props) {
	const navigate = useNavigate();

	const [isModalShow, setIsModalShow] = useState(false);

	const handleClickOrder = () => {
		// navigate("/order/:id");
	};

	const handleClickReviewAdd = () => {
		setIsModalShow(true);
	};

	// 더미 데이터
	const type = "customer";
	// const type = "owner";

	const orders = [
		{
			image: { image },
			title: "꽃 파는 가게",
			price: "15000",
			date: "2023.01.20",
			status: "beforePayment",
			isReviewWrited: true,
		},
		{
			image: { image },
			title: "꽃 파는 가게",
			price: "15000",
			date: "2023.01.20",
			status: "completePayment",
			isReviewWrited: false,
		},
		{
			image: { image },
			title: "꽃 파는 가게",
			price: "15000",
			date: "2023.01.20",
			status: "shipping",
			isReviewWrited: true,
		},
		{
			image: { image },
			title: "꽃 파는 가게",
			price: "15000",
			date: "2023.01.20",
			status: "shipping",
			status: "completeDelivery",
			isReviewWrited: false,
		},
	];

	return (
		<div>
			{orders.map(order => (
				<ShadowCardWrapper onClick={handleClickOrder}>
					<ShadowCard display="flex" isSpaceBetween={false} marginBottom="16">
						<img src={order.image.image} alt="product-img" />
						<TextContent>
							{/* top */}
							<RowContainer>
								<BoldText>{order.title}</BoldText>
								{type === "customer" ? (
									<>
										{order.isReviewWrited ? (
											<WhiteSmallButton onClick={() => navigate("/mypage/review/list")}>
												리뷰 보기
											</WhiteSmallButton>
										) : (
											<Primary50SmallButton onClick={handleClickReviewAdd}>
												리뷰 작성
											</Primary50SmallButton>
										)}
									</>
								) : (
									// <BoldText size="13" color="var(--primary-500)">
									// 	주문 상세 보기 &gt;
									// </BoldText>
									<>
										{order.status === "beforePayment" ? (
											<Primary400SmallButton>결제 전</Primary400SmallButton>
										) : order.status === "completePayment" ? (
											<WhiteSmallButton>결제 완료</WhiteSmallButton>
										) : order.status === "shipping" ? (
											<Primary50SmallButton>배송 중</Primary50SmallButton>
										) : (
											<GraySmallButton>배송 완료</GraySmallButton>
										)}
									</>
								)}
							</RowContainer>
							{/* bottom */}
							<RowContainer>
								<Text>{order.price} 원</Text>
								<GrayText size="13">{order.date}</GrayText>
							</RowContainer>
						</TextContent>
					</ShadowCard>
				</ShadowCardWrapper>
			))}
			{isModalShow && <ReviewAddModal isModalShow={isModalShow} setIsModalShow={setIsModalShow} />}
		</div>
	);
}

export default OrderList;
