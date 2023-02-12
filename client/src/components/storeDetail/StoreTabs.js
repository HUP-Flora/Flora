import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { reviewCountState } from "../../recoil/storeDetail";

import StoreProductTab from "./StoreProductTab";
import StoreReviewTab from "./StoreReviewTab";
import DoubleTabs from "../common/DoubleTabs";

function StoreTabs({ sId }) {
	const [isDefaultTabActive, setIsDefaultTabActive] = useState(true);
	const reviewCount = useRecoilValue(reviewCountState);

	return (
		<div>
			<DoubleTabs
				isDefaultTabActive={isDefaultTabActive}
				setIsDefaultTabActive={setIsDefaultTabActive}
				defaultTabTitle="상품"
				otherTabTitle={`리뷰 (${reviewCount})`}
			/>

			{isDefaultTabActive ? <StoreProductTab sId={sId} /> : <StoreReviewTab sId={sId} />}
		</div>
	);
}

export default StoreTabs;
