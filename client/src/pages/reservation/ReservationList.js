import React, { useState } from "react";

import StatusBar from "../../components/common/StatusBar";
import DoubleTabs from "../../components/common/DoubleTabs";
import ReservationConfirmTab from "../../components/reservation/ReservationConfirmTab";
import ReservationWaitingTab from "../../components/reservation/ReservationWaitingTab";
import { TabMenuBar } from "../../components/common/TabMenuBar";

function ReservationList(props) {
	const [isDefaultTabActive, setIsDefaultTabActive] = useState(true);

	return (
		<div>
			<StatusBar text="플로라이브 예약 내역" />
			<DoubleTabs
				isDefaultTabActive={isDefaultTabActive}
				setIsDefaultTabActive={setIsDefaultTabActive}
				defaultTabTitle="예약 확정"
				otherTabTitle="수락 대기"
			/>
			{isDefaultTabActive ? <ReservationConfirmTab /> : <ReservationWaitingTab />}
			<TabMenuBar selectedMenu="FloLive" />
		</div>
	);
}

export default ReservationList;
