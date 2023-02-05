import React from "react";

import { StatusBar } from "../../components/common/StatusBar";
import StoreInfo from "../../components/storeDetail/StoreInfo";
import StoreDetailButtons from "../../components/storeDetail/StoreDetailButtons";
import StoreTabs from "../../components/storeDetail/StoreTabs";

function StoreDetail(props) {
	return (
		<>
			<StatusBar text="가게 상세" />

			{/* 가게 기본 정보 */}
			<StoreInfo />

			{/* 버튼(사장, 고객 구분) */}
			<StoreDetailButtons />

			{/* 상품, 리뷰 탭 */}
			<StoreTabs />

			{/* 상품 목록 */}
		</>
	);
}

export default StoreDetail;