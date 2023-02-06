import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalContainer from "./ModalContainer";

import { Primary50Button, Primary400Button } from "../../styles/button/ButtonStyle";
import { BottomRowDoubleButtonContainer } from "../../styles/common/CommonStyle";

function ProductDetailButtons(props) {
	const navigate = useNavigate();

	const [isModalShow, setIsModalShow] = useState(false);

	const handleClickEdit = () => {
		navigate(`/productEdit`);
	};

	return (
		<BottomRowDoubleButtonContainer>
			{/* 고객 */}
			{/* <>
				<Primary400Button>플로라이브 신청</Primary400Button>
				<Primary50Button>플로라이브 예약</Primary50Button>
			</> */}
			{/* 사장 */}
			<>
				<Primary400Button onClick={handleClickEdit}>수정</Primary400Button>
				<Primary50Button onClick={() => setIsModalShow(true)}>삭제</Primary50Button>
				{isModalShow && (
					<ModalContainer isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
				)}
			</>
		</BottomRowDoubleButtonContainer>
	);
}

export default ProductDetailButtons;
