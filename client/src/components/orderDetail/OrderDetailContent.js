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
	const { num, date, sname, pname, payment, paymentNum, pimg } =
		useRecoilValue(orderDetailState);

	// payment 문자열 형태인 금액을 ,를 포함해줌
	const paymentAmount = payment?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


// date: "2023-02-12"
	// num: "202302123"
	// oid: 38
	// payment: 0
	// paymentNum: null
	// pimg: "https://hurry-up-push-bucket.s3.ap-northeast-2.amazonaws.com/b3fe56a6-6bc0-477d-a925-9d84fe1e6823-8c67c227f3fb3545a0cb7a637d1495e8.jpg"
	// pname: "ㅁㄴㅇㄹ"
	// sname: "염유리꽃집"
	// status: 1
	return (
		<OrderDetailContentContainer>
			<FlowerImage src={pimg} />
			<OrderDetailTitleContainer>
				<p>주문내역</p>
				<FlexBox>
					<p>{date}</p>
					<p>|</p>
					<p>{num}</p>
				</FlexBox>
			</OrderDetailTitleContainer>
			<MB16FlexBox>
				<p>가게명</p>
				<p>{sname}</p>
			</MB16FlexBox>
			<MB24FlexBox>
				<p>상품명</p>
				<p>{pname}</p>
			</MB24FlexBox>
			<MB24BorderFlexBox>
				<p>결제번호</p>
				<p>{paymentNum}</p>
			</MB24BorderFlexBox>
			<FooterBox>
				<p>결제금액</p>
				<p>{paymentAmount}원</p>
			</FooterBox>
		</OrderDetailContentContainer>
	);
}

export default OrderDetailContent;
