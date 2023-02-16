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
import { decideOrderStatus, decideProgressInfo } from "../../utils/orderDetail";

function ProgressBar({oId}) {
	const { receiptType, status } = useRecoilValue(orderDetailState);
	const [barWidth, setBarWidth] = useState("12%");
	const [first, setFirst] = useState(false);
	const [second, setSecond] = useState(false);
	const [third, setThird] = useState(false);
	const [fourth, setFourth] = useState(false);

	const nowStatus = decideOrderStatus(status);

	const setStates = (first, second, third, fourth, barWidth) => {
		setFirst(first);
		setSecond(second);
		setThird(third);
		setFourth(fourth);
		setBarWidth(barWidth);
	};

	useEffect(() => {
		decideProgressInfo(receiptType, nowStatus, setStates);
	}, [receiptType, nowStatus]);

	return (
		<>
			<StatusChange oId={oId} />
			<OrderStatusContainer>
				<OrderStatusText isNow={first}>결제 전</OrderStatusText>
				<OrderStatusText isNow={second}>결제 완료</OrderStatusText>
				{receiptType === "배달" && (
					<>
						<OrderStatusText isNow={third}>배송 중</OrderStatusText>
						<OrderStatusText isNow={fourth}>배송 완료</OrderStatusText>
					</>
				)}
				{receiptType === "픽업" && <OrderStatusText isNow={third}>수령 완료</OrderStatusText>}
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
