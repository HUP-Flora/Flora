import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalContainer from "./ModalContainer";

import { Primary50Button, Primary400Button } from "../../styles/button/ButtonStyle";
import { BottomRowDoubleButtonContainer } from "../../styles/common/CommonStyle";
import useStoreDetail from "../../hooks/useStoreDetail";

function ProductDetailButtons({ pId, sId }) {
	const navigate = useNavigate();

	const [isModalShow, setIsModalShow] = useState(false);

	const { enterFloliveAPI } = useStoreDetail();

	const enterFloliveHandler = () => {
		enterFloliveAPI();
		navigate("/flolive/waiting");
	};

	// 더미 데이터
	// const type = "customer";
	const type = "owner";

	return (
		<BottomRowDoubleButtonContainer>
			{type === "customer" ? (
				<>
					{/* 고객 */}
					<Primary400Button onClick={enterFloliveHandler}>플로라이브 신청</Primary400Button>
					<Primary50Button onClick={() => navigate("")}>플로라이브 예약</Primary50Button>
				</>
			) : (
				<>
					{/* 사장 */}
					<Primary400Button onClick={() => navigate(`edit`)}>수정</Primary400Button>
					<Primary50Button onClick={() => setIsModalShow(true)}>삭제</Primary50Button>
					{isModalShow && (
						<ModalContainer
							isModalShow={isModalShow}
							setIsModalShow={setIsModalShow}
							pId={pId}
							sId={sId}
						/>
					)}
				</>
			)}
		</BottomRowDoubleButtonContainer>
	);
}

export default ProductDetailButtons;
