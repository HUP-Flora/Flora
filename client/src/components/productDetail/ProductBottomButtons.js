import React from "react";

import { ButtonsContainer } from "../../styles/productDetail/ProducBottomButtonsStyle";
import { Primary50Button, Primary400Button } from "../../styles/button/ButtonStyle";

function ProductDetailButtons(props) {
	return (
		<ButtonsContainer>
			{/* 고객 */}
			<>
				<Primary400Button>플로라이브 신청</Primary400Button>
				<Primary50Button>플로라이브 예약</Primary50Button>
			</>
			{/* 사장 */}
			{/* <>
				<Primary400Button>수정</Primary400Button>
				<Primary50Button>삭제</Primary50Button>
			</> */}
		</ButtonsContainer>
	);
}

export default ProductDetailButtons;
