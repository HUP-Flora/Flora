import React, { useState } from "react";

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
	const storeName = "꽃집이요";
	const storeDescription =
		"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid";
	// "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid";
	const storeTel = "010-1234-5678";
	const storeAddress =
		"대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층";
	const storeWorkingTime = "09:00 ~ 18:00";
	const holiday = "월요일";
	const storeHoliday = `매주 ${holiday} 휴무`;
	const storeImgSrc = "../../assets/store.png";

	// on/off 토글 더미(백 연동 이전)
	const [isOn, setIsOn] = useState(true);

	// on/off 토글 클릭 핸들러
	const handleClickToggle = () => {
		setIsOn(!isOn);
	};

	return (
		<StoreInfoContainer>
			{/* 헤더(사장, 고객 구분) */}
			<Header>
				<BoldText BoldText size="19">
					{storeName}
				</BoldText>
				{/* 조건부 렌더링: 사장님 -> 토글 */}
				<OnOffToggle onClick={handleClickToggle} isOn={isOn}>
					<OnOff isOn={isOn}>{isOn ? "ON" : "OFF"}</OnOff>
				</OnOffToggle>
			</Header>
			<InfoContainer>
				<ImageWrapper>
					<Image src={dummyImg} alt="store-img" />
				</ImageWrapper>
				<Description>{storeDescription}</Description>
			</InfoContainer>

			<GrayHr />

			<BasicInfoContainer>
				<BasicInfoRow>
					<Text size="13">{storeTel}</Text>
					<Text size="13">{storeWorkingTime}</Text>
				</BasicInfoRow>
				<BasicInfoRow>
					<Text size="13">{storeAddress}</Text>
					<Text size="13">{storeHoliday}</Text>
				</BasicInfoRow>
			</BasicInfoContainer>
		</StoreInfoContainer>
	);
}

export default StoreInfo;
