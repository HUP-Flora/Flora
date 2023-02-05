import React, { useEffect, useState } from "react";
import {
	OrderStatusContainer,
	OrderStatusLine,
	OrderStatusLineNow,
	OrderStatusText,
} from "../../styles/orderDetail/ProgressBarStyle";
import { useRecoilValue } from "recoil";
import { orderDetailState } from "../../recoil/orderDetail";
import StatusChange from "./StatusChange";
import { decideProgressInfo } from "../../utils/orderDetail";

function ProgressBar() {
	const { orderType, orderStatus } = useRecoilValue(orderDetailState);
	const [barWidth, setBarWidth] = useState("12%");
	const [first, setFirst] = useState(false);
	const [second, setSecond] = useState(false);
	const [third, setThird] = useState(false);
	const [fourth, setFourth] = useState(false);

	const setStates = (first, second, third, fourth, barWidth) => {
		setFirst(first);
		setSecond(second);
		setThird(third);
		setFourth(fourth);
		setBarWidth(barWidth);
	};

	useEffect(() => {
		decideProgressInfo(orderType, orderStatus, setStates);
	}, [orderType, orderStatus]);

	return (
		<>
			<StatusChange />
			<OrderStatusContainer>
				<OrderStatusText isNow={first}>결제 전</OrderStatusText>
				<OrderStatusText isNow={second}>결제 완료</OrderStatusText>
				{orderType === "DELIVERY" && (
					<>
						<OrderStatusText isNow={third}>배송 중</OrderStatusText>
						<OrderStatusText isNow={fourth}>배송 완료</OrderStatusText>
					</>
				)}
				{orderType === "PICKUP" && <OrderStatusText isNow={third}>수령 완료</OrderStatusText>}
			</OrderStatusContainer>
			<OrderStatusLine>
				<OrderStatusLineNow width={barWidth} />
			</OrderStatusLine>
		</>
	);
}

export default React.memo(ProgressBar, (prevProps, nextProps) => {
	return prevProps === nextProps;
});
