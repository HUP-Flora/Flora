import StatusBar from "../../components/common/StatusBar";
import { OrderDetailContainer, RepaymentButton } from "../../styles/orderDetail/OrderDetailStyle";
import OrderDetailHeader from "../../components/orderDetail/OrderDetailHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderDetailState } from "../../recoil/orderDetail";
import { useEffect } from "react";
import ProgressBar from "../../components/orderDetail/ProgressBar";
import OrderDetailContent from "../../components/orderDetail/OrderDetailContent";
import { useOrdersApi } from "../../hooks/useOrdersApi";
import { useParams } from "react-router-dom";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import { userTypeState } from "../../recoil/signup";
import { userInfoTypeState } from "../../recoil/userInfo";
import { KakaoPaymentButton } from "../../styles/button/ButtonStyle";
import { KakaoPayment } from "../kakaoPayment/KakaoPayment";
import { KakaoPaymentButtonSection } from "../../styles/common/CommonStyle";

function OrderDetail() {
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);
	const { getOrderDetail } = useOrdersApi();
	const userInfoType = useRecoilValue(userInfoTypeState);
	const { oId } = useParams();

	useEffect(() => {
		getOrderDetail(oId);
	}, []);

	// const user = "사장";

	return (
		<>
			<NoPaddingStatusBar text="주문 상세" />
			<OrderDetailContainer>
				<OrderDetailHeader />
				<ProgressBar oId={oId} />
				<OrderDetailContent />
				{orderDetail?.status === 0 && userInfoType === "CUSTOMER" && (
					// <RepaymentButton>{orderDetail.flowerPrice} 재결제하기</RepaymentButton>
					<KakaoPaymentButtonSection>
						<KakaoPayment oId={oId} isLargeButton={true} />
					</KakaoPaymentButtonSection>
				)}
			</OrderDetailContainer>
		</>
	);
}

export default OrderDetail;
