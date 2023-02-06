import StatusBar from "../../components/common/StatusBar";
import { OrderDetailContainer } from "../../styles/orderDetail/OrderDetailStyle";
import OrderDetailHeader from "../../components/orderDetail/OrderDetailHeader";
import { useRecoilState } from "recoil";
import { orderDetailState } from "../../recoil/orderDetail";
import { useEffect } from "react";
import ProgressBar from "../../components/orderDetail/ProgressBar";
import OrderDetailContent from "../../components/orderDetail/OrderDetailContent";

function OrderDetail() {
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);

	useEffect(() => {
		setOrderDetail({
			orderType: "DELIVERY",
			orderStatus: "결제 완료",
			orderDate: "2021-08-01",
			orderNumber: "B001230120001",
			shopName: "꽃집이요",
			flowerName: "안개꽃 한 송이",
			flowerPrice: "10,000원",
			paymentNumber: "F230A233P1",
		});
	}, [setOrderDetail]);

	return (
		<>
			<StatusBar text="주문 상세" />
			<OrderDetailContainer>
				<OrderDetailHeader />
				<ProgressBar />
				<OrderDetailContent />
			</OrderDetailContainer>
		</>
	);
}

export default OrderDetail;
