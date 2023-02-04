import React, { useState } from "react";

import StoreProductTab from "./StoreProductTab";
import StoreReviewTab from "./StoreReviewTab";
import DoubleTabs from "../common/DoubleTabs";

function StoreTabs(props) {
	const [isDefaultTabActive, setIsDefaultTabActive] = useState(true);

	// 더미 데이터
	const reviewCount = 51;

	return (
		<div>
			<DoubleTabs
				isDefaultTabActive={isDefaultTabActive}
				setIsDefaultTabActive={setIsDefaultTabActive}
				defaultTabTitle="제품"
				otherTabTitle={`리뷰 (${reviewCount})`}
			/>

			{isDefaultTabActive ? <StoreProductTab /> : <StoreReviewTab />}
		</div>
	);
}

export default StoreTabs;
