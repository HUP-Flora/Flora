import {
	FlexBox,
	FlowerImage,
	FooterBox,
	MB16FlexBox,
	MB24BorderFlexBox,
	MB24FlexBox,
	OrderDetailContentContainer,
	OrderDetailTitleContainer,
} from "../../styles/orderDetail/OrderDetailStyle";
import { useRecoilValue } from "recoil";
import { orderDetailState } from "../../recoil/orderDetail";

function OrderDetailContent() {
	const { orderNumber, orderDate, shopName, flowerName, flowerPrice, paymentNumber } =
		useRecoilValue(orderDetailState);

	return (
		<OrderDetailContentContainer>
			<FlowerImage src={"http://love2flower.com/goods/a1731d.jpg"} />
			<OrderDetailTitleContainer>
				<p>주문내역</p>
				<FlexBox>
					<p>{orderDate}</p>
					<p>|</p>
					<p>{orderNumber}</p>
				</FlexBox>
			</OrderDetailTitleContainer>
			<MB16FlexBox>
				<p>가게명</p>
				<p>{shopName}</p>
			</MB16FlexBox>
			<MB24FlexBox>
				<p>상품명</p>
				<p>{flowerName}</p>
			</MB24FlexBox>
			<MB24BorderFlexBox>
				<p>결제번호</p>
				<p>{paymentNumber}</p>
			</MB24BorderFlexBox>
			<FooterBox>
				<p>결제금액</p>
				<p>{flowerPrice}</p>
			</FooterBox>
		</OrderDetailContentContainer>
	);
}

export default OrderDetailContent;
