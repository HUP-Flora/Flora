import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalContainer from "./ModalContainer";

import { Primary50Button, Primary400Button } from "../../styles/button/ButtonStyle";
import { BottomRowDoubleButtonContainer } from "../../styles/common/CommonStyle";
import useStoreDetail from "../../hooks/useStoreDetail";
import { useRecoilValue } from "recoil";
import { ownersIdState, userInfoTypeState } from "../../recoil/userInfo";

function ProductDetailButtons({ pId, sId }) {
	const [isModalShow, setIsModalShow] = useState(false);
	const userType = useRecoilValue(userInfoTypeState);
	const ownersId = useRecoilValue(ownersIdState);
	const { enterFloliveAPI } = useStoreDetail();

	const navigate = useNavigate();

	const enterFloliveHandler = () => {
		enterFloliveAPI();
		navigate("/flolive/waiting");
	};

	return (
		<BottomRowDoubleButtonContainer>
			{ownersId === sId ? (
				<>
					{/* 사장 */}
					<Primary400Button onClick={() => navigate(`/store/${sId}/product/${pId}/edit`)}>
						수정
					</Primary400Button>
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
			) : (
				<>
					{/* 고객 */}
					<Primary400Button onClick={enterFloliveHandler}>플로라이브 신청</Primary400Button>
					<Primary50Button
						onClick={() => navigate(`/store/${sId}/product/${pId}/reservation/type`)}
					>
						플로라이브 예약
					</Primary50Button>
				</>
			)}
		</BottomRowDoubleButtonContainer>
	);
}

export default ProductDetailButtons;
