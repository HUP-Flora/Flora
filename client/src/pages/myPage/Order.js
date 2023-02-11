import React from "react";

import StatusBar from "../../components/common/StatusBar";
import OrderList from "../../components/myPage/OrderList";

import { Container } from "../../styles/myPage/ListDetailStyle";

function OrderDetail(props) {
	return (
		<div>
			<StatusBar text="주문 목록" />
			<Container>
				<OrderList size={5}/>
			</Container>
		</div>
	);
}

export default OrderDetail;
