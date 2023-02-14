import React from "react";

import StatusBar from "../../components/common/StatusBar";
import StoreInfo from "../../components/storeDetail/StoreInfo";
import StoreDetailButtons from "../../components/storeDetail/StoreDetailButtons";
import StoreTabs from "../../components/storeDetail/StoreTabs";
import { RstoreIdState } from "../../recoil/reservation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import { ownersIdState, userInfoTypeState } from "../../recoil/userInfo";
import { TabMenuBar } from "../../components/common/TabMenuBar";
import { BlankSection } from "../../styles/common/CommonStyle";

function StoreDetail() {
	const ownersId = useRecoilValue(ownersIdState);
	const userType = useRecoilValue(userInfoTypeState);

	const { sId } = useParams();

	// 예약 페이지로 넘겨줄 storeId가 필요하다.
	// 가게 상세페이지로 넘어오면, storeId를 저장한다.
	const setRstoreId = useSetRecoilState(RstoreIdState);

	// 페이지 로드 시, storeId를 저장한다.
	useEffect(() => {
		setRstoreId(sId);
	}, []);

	return (
		<>
			<NoPaddingStatusBar text="가게 상세" />
			<StoreInfo isMyStore={ownersId === sId} />
			<StoreDetailButtons sId={sId} isMyStore={ownersId === sId} />
			<StoreTabs sId={sId} isMyStore={ownersId === sId} />
			<BlankSection height="72" />
			{userType === "STORE" && <TabMenuBar selectedMenu="MyStore" />}
		</>
	);
}

export default StoreDetail;
