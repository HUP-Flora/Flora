import React from "react";
import { useNavigate } from "react-router-dom";

import OrderList from "./OrderList";

import { BoldText, GrayText } from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";

function MyPageOrderList(props) {
	const navigate = useNavigate();

	const handleClickMore = () => {
		navigate("/orderDetail");
	};

	return (
		<ListContiner>
			<ListHeader>
				<BoldText size="19">주문 내역</BoldText>
				<GrayText weight="bold" onClick={handleClickMore}>
					더보기
				</GrayText>
			</ListHeader>
			<OrderList />
		</ListContiner>
	);
}

export default MyPageOrderList;
