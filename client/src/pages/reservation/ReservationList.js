import React, { useState } from "react";

import StatusBar from "../../components/common/StatusBar";
import DoubleTabs from "../../components/common/DoubleTabs";
import ReservationConfirmTab from "../../components/reservation/ReservationConfirmTab";
import ReservationWaitingTab from "../../components/reservation/ReservationWaitingTab";
import { TabMenuBar } from "../../components/common/TabMenuBar";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import { useRecoilValue } from "recoil";
import { userInfoTypeState } from "../../recoil/userInfo";

function ReservationList(props) {
	const [isDefaultTabActive, setIsDefaultTabActive] = useState(true);
	const userType = useRecoilValue(userInfoTypeState);

	return (
		<div>
			<NoPaddingStatusBar text="플로라이브 예정" />
			{userType === "STORE" ? (
				<>
					<DoubleTabs
						isDefaultTabActive={isDefaultTabActive}
						setIsDefaultTabActive={setIsDefaultTabActive}
						defaultTabTitle="실시간 내역"
						otherTabTitle="예약 내역"
					/>
					{isDefaultTabActive ? <ReservationWaitingTab /> : <ReservationConfirmTab />}
				</>
			) : (
				<ReservationConfirmTab />
			)}
			<TabMenuBar selectedMenu="FloLive" />
		</div>
	);
}

export default ReservationList;
