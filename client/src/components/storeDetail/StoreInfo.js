import React from "react";

import {
	StoreInfoContainer,
	Header,
	ImageWrapper,
	InfoContainer,
	Image,
	Description,
	BasicInfoContainer,
	Info,
	BasicInfoRow,
} from "../../styles/storeDetail/StoreDetailStyle";
import { BoldText, Text, GrayHr } from "../../styles/common/CommonStyle";

import dummyImg from "../../assets/store.png";

function StoreInfo(props) {
	// 더미 데이터
	const storeName = "꽃집이요";
	const storeDescription =
		"안녕하세요 꽃집이요 입니다! 예약된 꽃은 당일 시장에서 직접 공수해오고 있습니다 :)";
	const storeTel = "010-1234-5678";
	const storeAddress =
		"대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층";
	const storeWorkingTime = "09:00 ~ 18:00";
	const holiday = "월요일";
	const storeHoliday = `매주 ${holiday} 휴무`;
	const storeImgSrc = "../../assets/store.png";

	return (
		<StoreInfoContainer>
			{/* 헤더(사장, 고객 구분) */}
			<Header>
				<BoldText BoldText size="25">
					{storeName}
				</BoldText>
				{/* 조건부 렌더링: 사장님 -> 토글 */}
				<div>토글</div>
			</Header>
			<InfoContainer>
				{/* 대표 사진 */}
				<ImageWrapper>
					<Image src={dummyImg} alt="store-img" />
				</ImageWrapper>
				{/* 소개글 */}
				<Text size="13">{storeDescription}</Text>
			</InfoContainer>

			{/* 구분선 */}
			<GrayHr />

			{/* 기본 정보 */}
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
