import React from "react";

import StatusBar from "../../components/common/StatusBar";
import StoreInfo from "../../components/storeDetail/StoreInfo";
import StoreDetailButtons from "../../components/storeDetail/StoreDetailButtons";
import StoreTabs from "../../components/storeDetail/StoreTabs";
import { RstoreIdState } from "../../recoil/reservation";
import { useSetRecoilState } from "recoil";

function StoreDetail() {
	// 예약 페이지로 넘겨줄 storeId가 필요하다.
	// 가게 상세페이지로 넘어오면, storeId를 저장한다.
	const setRstoreId = useSetRecoilState(RstoreIdState);

	// 페이지 로드 시, storeId를 저장한다.
	// useEffect(() => {
	// 	setRstoreId(props.match.params.storeId);
	// }, []);

	return (
		<>
			<StatusBar text="가게 상세" />
			<StoreInfo />
			<StoreDetailButtons />
			<StoreTabs />
		</>
	);
}

export default StoreDetail;
