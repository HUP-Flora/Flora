import React from "react";
import { GrayText } from "../../styles/common/CommonStyle";
import { EmptyContainer } from "../../styles/common/CommonStyle";

function StoreTabEmpty({ type }) {
	return (
		<EmptyContainer>
			<GrayText>등록된 {type === "product" ? "상품이" : "리뷰가"} 없습니다.</GrayText>
		</EmptyContainer>
	);
}

export default StoreTabEmpty;
