import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { storeState, isFloMarkClickedState } from "../../recoil/storeDetail";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";
import useStoreDetail from "../../hooks/useStoreDetail";

import { useIsFloMarkApi } from "../../hooks/useIsFloMarkApi";
import { useFloMarkAddApi } from "../../hooks/useFloMarkAddApi";
import { useFloMarkDeleteApi } from "../../hooks/useFloMarkDeleteApi";

import {
	ButtonsContainer,
	FloLiveButtonContainer,
	FlorMarkWrapper,
} from "../../styles/storeDetail/StoreDetailButtonsStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

import floMarkGraySrc from "../../assets/floMarkGray.png";
import floMarkPinkSrc from "../../assets/floMarkPink.png";
import liveTvSrc from "../../assets/live-tv-white.png";
import { userInfoTypeState } from "../../recoil/userInfo";

function StoreDetailButtons({ sId, isMyStore }) {
	const navigate = useNavigate();

	const [store, setStore] = useRecoilState(storeState);
	const [isFloMarkClicked, setIsFloMarkClicked] = useRecoilState(isFloMarkClickedState);
	const userInfoType = useRecoilValue(userInfoTypeState);

	// 플로라이브 입장 테스트 코드
	const setLmyType = useSetRecoilState(LmyTypeState);
	const setLmySessionId = useSetRecoilState(LmySessionIdState);

	const isFloMarkApi = useIsFloMarkApi();
	const floMarkAddApi = useFloMarkAddApi();
	const floMarkDeleteApi = useFloMarkDeleteApi();

	const { enterFloliveAPI } = useStoreDetail();

	// let { sId } = useParams();

	const handleEnterFlolive = () => {
		enterFloliveAPI();
		navigate("/flolive/waiting");
	};

	const handleFloMarkClick = () => {
		// 클릭 여부로 백에 추가 / 삭제 요청
		if (isFloMarkClicked && store?.bookmarkCnt > 0) {
			floMarkDeleteApi(sId);
		} else if (!isFloMarkClicked) {
			floMarkAddApi(sId);
		}
		setIsFloMarkClicked(!isFloMarkClicked);
	};

	useEffect(() => {
		// 꽃갈피 등록 여부
		isFloMarkApi(sId);
	}, []);

	return (
		<>
			{/* 사장, 고객 조건부 렌더링 */}
			{isMyStore ? (
				<ButtonsContainer isCustomer={false}>
					<>
						<Primary400Button onClick={() => navigate(`/store/${sId}/edit`)}>
							가게 정보 수정
						</Primary400Button>
						<Primary50Button onClick={() => navigate(`product/add`)}>상품 등록</Primary50Button>
					</>
				</ButtonsContainer>
			) : (
				<ButtonsContainer isCustomer={true}>
					{/* 고객 */}
					<>
						<FlorMarkWrapper onClick={handleFloMarkClick} isFloMarkClicked={isFloMarkClicked}>
							<img src={isFloMarkClicked ? floMarkPinkSrc : floMarkGraySrc} alt="flomark-icon" />
							<div>{store?.bookmarkCnt}</div>
						</FlorMarkWrapper>
						{/* 플로라이브 신청 버튼 */}
						<FloLiveButtonContainer>
							<Primary400Button onClick={handleEnterFlolive}>
								<img src={liveTvSrc} alt="live-tv-icon" />
								플로라이브 신청
							</Primary400Button>
						</FloLiveButtonContainer>
					</>
				</ButtonsContainer>
			)}
		</>
	);
}

export default StoreDetailButtons;
