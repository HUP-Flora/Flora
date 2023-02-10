import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSetRecoilState } from "recoil";
import { reviewCountState } from "../../recoil/storeDetail";

import {
	StoreInfoContainer,
	Header,
	ImageWrapper,
	InfoContainer,
	Image,
	Description,
	BasicInfoContainer,
	BasicInfoRow,
} from "../../styles/storeDetail/StoreDetailStyle";
import { BoldText, Text, GrayHr, OnOffToggle, OnOff } from "../../styles/common/CommonStyle";

import dummyImg from "../../assets/store.png";

function StoreInfo(props) {
	// 더미 데이터
	const sId = "00000000";
	// 더미 데이터 끝 -------------------------------

	// const [reviewsCount, setReviewsCount] = useRecoilState(reviewCountState);
	const setReviewsCount = useSetRecoilState(reviewCountState);

	// on/off 토글 더미(백 연동 이전)
	const [store, setStore] = useState();
	const [isOn, setIsOn] = useState();

	useEffect(() => {
		// const response = axios.get(`/api/stores/${sId}`);

		// const response.data = {
		const response = {
			sId: 1111111,
			name: "꽃집이요",
			desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid",
			phoneNumber: "010-1234-5678",
			address_name: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			holiday: "월요일",
			isOnair: false,
			start: "09:00",
			end: "18:00",
			bookmarkCnt: 100,
			reviewCnt: 51,
			img: { dummyImg },
		};

		// setStore(response.data);
		setStore(response);
		setIsOn(response.isOnair);
		setReviewsCount(response.reviewCnt);
	}, []);

	// on/off 토글 클릭 핸들러
	const handleClickToggle = () => {
		setIsOn(!isOn);
	};

	return (
		<StoreInfoContainer>
			{/* 헤더(사장, 고객 구분) */}
			<Header>
				<BoldText BoldText size="19">
					{store?.name}
				</BoldText>
				{/* 조건부 렌더링: 사장님 -> 토글 */}
				<OnOffToggle onClick={handleClickToggle} isOn={isOn}>
					<OnOff isOn={isOn}>{isOn ? "ON" : "OFF"}</OnOff>
				</OnOffToggle>
			</Header>
			<InfoContainer>
				<ImageWrapper>
					<Image src={store?.img?.dummyImg} alt="store-img" />
				</ImageWrapper>
				<Description>{store?.desc}</Description>
			</InfoContainer>
			<GrayHr />
			<BasicInfoContainer>
				<BasicInfoRow>
					<Text size="13">{store?.phoneNumber}</Text>
					<Text size="13">
						{store?.start} ~ {store?.end}
					</Text>
				</BasicInfoRow>
				<BasicInfoRow>
					<Text size="13">{store?.address_name}</Text>
					<Text size="13">{store?.holiday}</Text>
				</BasicInfoRow>
			</BasicInfoContainer>
		</StoreInfoContainer>
	);
}

export default StoreInfo;
