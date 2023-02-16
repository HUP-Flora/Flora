import React, { useEffect } from "react";

import FloLiveWaitingContainer from "../../components/flolive/FloLiveWaitingContainer";
import useStoreDetail from "../../hooks/useStoreDetail";
import { LliveStatusState, LorderNumberState } from "../../recoil/flolive";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function FloliveWaiting() {
	const LliveStatus = useRecoilValue(LliveStatusState);
	const LorderNumber = useRecoilValue(LorderNumberState);
	const { checkLiveStatusAPI } = useStoreDetail();

	useEffect(() => {
		const checkStatusInterval = setInterval(() => {
			// 5초마다 라이브 상태를 확인한다.
			checkLiveStatusAPI(LorderNumber, LliveStatus);
		}, 2500);
		return () => {
			clearInterval(checkStatusInterval);
		};
	}, [LorderNumber, LliveStatus, checkLiveStatusAPI]);

	const navigate = useNavigate();
	useEffect(() => {
		console.log("LliveStatus", LliveStatus);
		// 라이브 신청이 수락하면 작동할 로직.
		if (LliveStatus.sessionId) {
			navigate(`/flolive/${LorderNumber}/${LliveStatus.sessionId}`);
		}}, [LliveStatus, navigate, LorderNumber]);


	return <FloLiveWaitingContainer />;
}

export default FloliveWaiting;
