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

	const { ordersApi } = useOrdersApi();

	const [orders, setOrders] = useRecoilState(ordersState);

	const [isModalShow, setIsModalShow] = useState(false);
	const [sId, setSId] = useState("");
	const [oId, setOId] = useState("");

	const handleClickOrder = () => {
		// navigate("/order/:id");
	};

	const handleClickReviewAdd = (oId, sId) => {
		setIsModalShow(true);
		setSId(sId);
		setOId(oId);
	};

	// 더미 데이터
	const type = "customer";
	// const type = "owner";

	useEffect(() => {
		ordersApi(type, size);
	}, []);

	return (
		<div>
			{orders.length === 0 ? (
				<MyPageListEmpty text="주문 내역이" />
			) : (
				orders.map((order, index) => (
					<ShadowCardWrapper key={index} onClick={handleClickOrder}>
						<ShadowCard display="flex" isSpaceBetween={false} marginBottom="16">
							{order.simg === null && order.pimg === null ? (
								<img src={defaultImg} alt="product-img" />
							) : (
								<img src={order?.pimg || order?.simg} alt="product-img" />
							)}

							<TextContent>
								<RowContainer>
									{order?.sName === null && order?.pname === null ? (
										<GrayText weight="bold">상품 미선택</GrayText>
									) : (
										<BoldText>{order?.sname || order?.pname}</BoldText>
									)}
									{type === "customer" ? (
										<>
											{order?.review ? (
												<WhiteSmallButton onClick={() => navigate("/mypage/review/list")}>
													리뷰 보기
												</WhiteSmallButton>
											) : (
												<Primary50SmallButton
													onClick={() => handleClickReviewAdd(order?.oid, order?.sid)}
												>
													리뷰 작성
												</Primary50SmallButton>
											)}
										</>
									) : (
										<>
											{order.status === 0 ? (
												<Primary400SmallButton>결제 전</Primary400SmallButton>
											) : order.status === 1 ? (
												<WhiteSmallButton>결제 완료</WhiteSmallButton>
											) : order.status === 2 ? (
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
									<GrayText size="13">{order.orderDate}</GrayText>
								</RowContainer>
							</TextContent>
						</ShadowCard>
					</ShadowCardWrapper>
				))
			)}
			{isModalShow && (
				<ReviewAddModal
					isModalShow={isModalShow}
					setIsModalShow={setIsModalShow}
					sId={sId}
					oId={oId}
				/>
			)}
		</div>
	);
}

export default OrderList;
