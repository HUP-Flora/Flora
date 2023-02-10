import React, { useEffect } from "react";

import FloLiveWaitingContainer from "../../components/flolive/FloLiveWaitingContainer";
import useStroeDetail from "../../hooks/useStroeDetail";
import { LliveStatusState, LorderNumberState } from "../../recoil/flolive";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function FloliveWaiting() {
	const LliveStatus = useRecoilValue(LliveStatusState);
	const LorderNumber = useRecoilValue(LorderNumberState);
	const { checkLiveStatusAPI } = useStroeDetail();

	useEffect(() => {
		const checkStatusInterval = setInterval(() => {
			// 5초마다 라이브 상태를 확인한다.
			checkLiveStatusAPI(LorderNumber);
			// console.log("checkLiveStatusAPI");
		}, 5000);
		return () => {
			clearInterval(checkStatusInterval);
		};
	}, [LorderNumber]);

	const navigate = useNavigate();
	useEffect(() => {
		console.log("LliveStatus", LliveStatus);
		// 라이브 신청이 수락하면 작동할 로직.
		// if (LliveStatus === "live") {
		// navigate("/flolive");
	}, [LliveStatus]);

	return <FloLiveWaitingContainer />;
}

export default FloliveWaiting;
