import React from "react";

import StatusBar from "../../components/common/StatusBar";
import StoreInfo from "../../components/storeDetail/StoreInfo";
import StoreDetailButtons from "../../components/storeDetail/StoreDetailButtons";
import StoreTabs from "../../components/storeDetail/StoreTabs";

function StoreDetail(props) {
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
