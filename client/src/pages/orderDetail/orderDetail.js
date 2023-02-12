import StatusBar from "../../components/common/StatusBar";
import { OrderDetailContainer, RepaymentButton } from "../../styles/orderDetail/OrderDetailStyle";
import OrderDetailHeader from "../../components/orderDetail/OrderDetailHeader";
import { useRecoilState } from "recoil";
import { orderDetailState } from "../../recoil/orderDetail";
import { useEffect } from "react";
import ProgressBar from "../../components/orderDetail/ProgressBar";
import OrderDetailContent from "../../components/orderDetail/OrderDetailContent";
import { useOrdersApi } from "../../hooks/useOrdersApi";
import { useParams } from "react-router-dom";

function OrderDetail() {
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);
	const { getOrderDetail } = useOrdersApi();
	const { oId } = useParams();

	useEffect(() => {
		console.log("oid", oId);
		getOrderDetail(oId);
	}, [getOrderDetail, oId]);

	const user = "사장";

	return (
		<>
			<StatusBar text="주문 상세" />
			<OrderDetailContainer>
				<OrderDetailHeader />
				<ProgressBar />
				<OrderDetailContent />
				{orderDetail?.status === 0 && user === "손님" && <RepaymentButton>{orderDetail.flowerPrice} 재결제하기</RepaymentButton>}
			</OrderDetailContainer>
		</>
	);
}

export default OrderDetail;
