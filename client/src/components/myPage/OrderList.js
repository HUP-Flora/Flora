import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { ordersState } from "../../recoil/order";

import { useOrdersApi } from "../../hooks/useOrdersApi";

import MyPageListEmpty from "./MyPageListEmpty";
import ReviewAddModal from "./ReviewAddModal";

import { priceComma } from "../../hooks/priceComma";

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

import defaultImg from "../../assets/default-flower.png";
import image from "../../assets/store.png";

function OrderList({ size }) {
	const navigate = useNavigate();

	const ordersApi = useOrdersApi();

	const [orders, setOrders] = useRecoilState(ordersState);

	const [isModalShow, setIsModalShow] = useState(false);

	const handleClickOrder = () => {
		// navigate("/order/:id");
	};

	const handleClickReviewAdd = () => {
		setIsModalShow(true);
	};

	// 더미 데이터
	// const type = "customer";
	const type = "owner";

	useEffect(() => {
		ordersApi(size);
	}, []);

	return (
		<div>
			{orders.length === 0 ? (
				<MyPageListEmpty text="주문 내역이" />
			) : (
				orders.map(order => (
					<ShadowCardWrapper onClick={handleClickOrder}>
						<ShadowCard display="flex" isSpaceBetween={false} marginBottom="16">
							{order?.sImg === null ? (
								<img src={defaultImg} alt="product-img" />
							) : (
								<img src={order?.sImg?.image} alt="product-img" />
							)}

							<TextContent>
								<RowContainer>
									{order?.sName === null ? (
										<GrayText weight="bold">상품 미선택</GrayText>
									) : (
										<BoldText>{order?.sName}</BoldText>
									)}
									{type === "customer" ? (
										<>
											{order.review ? (
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
									<Text>{priceComma(order?.payment)} 원</Text>
									<GrayText size="13">{order.receiptDate}</GrayText>
								</RowContainer>
							</TextContent>
						</ShadowCard>
					</ShadowCardWrapper>
				))
			)}
			{isModalShow && <ReviewAddModal isModalShow={isModalShow} setIsModalShow={setIsModalShow} />}
		</div>
	);
}

export default OrderList;
