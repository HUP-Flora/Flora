import React from "react";

import StatusBar from "../../components/common/NoPaddingStatusBar";
import OrderList from "../../components/myPage/OrderList";

import { Container } from "../../styles/myPage/ListDetailStyle";

function OrderDetail(props) {
	return (
		<div>
			<StatusBar text="주문 목록" />
			<Container>
				<OrderList />
			</Container>
		</div>
	);
}

export default OrderDetail;
