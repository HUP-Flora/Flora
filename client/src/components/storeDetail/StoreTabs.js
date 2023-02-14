import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { reviewCountState, storeState } from "../../recoil/storeDetail";

import StoreProductTab from "./StoreProductTab";
import StoreReviewTab from "./StoreReviewTab";
import DoubleTabs from "../common/DoubleTabs";

function StoreTabs({ sId }) {
	const [isDefaultTabActive, setIsDefaultTabActive] = useState(true);
	const store = useRecoilValue(storeState);

	return (
		<div>
			<DoubleTabs
				isDefaultTabActive={isDefaultTabActive}
				setIsDefaultTabActive={setIsDefaultTabActive}
				defaultTabTitle="상품"
				otherTabTitle={`리뷰 (${store.reviewCnt})`}
			/>

			{isDefaultTabActive ? <StoreProductTab sId={sId} /> : <StoreReviewTab sId={sId} />}
		</div>
	);
}

export default StoreTabs;
