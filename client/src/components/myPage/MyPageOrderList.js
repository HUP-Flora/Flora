import React from "react";
import { useNavigate } from "react-router-dom";

import OrderList from "./OrderList";

import { BoldText, GrayText, PointerGrayText, PointerText } from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";

function MyPageOrderList(props) {
	const navigate = useNavigate();

	return (
		<ListContiner>
			<ListHeader>
				<BoldText size="19">주문 내역</BoldText>
				<PointerText color="gray" weight="bold" onClick={() => navigate("order/list")}>
					더보기
				</PointerText>
			</ListHeader>
			<OrderList size={3} />
		</ListContiner>
	);
}

export default MyPageOrderList;
