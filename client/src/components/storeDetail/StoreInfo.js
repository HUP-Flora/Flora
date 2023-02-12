import React, { useState, useEffect } from "react";

import { useStoreInfoApi, useToggleApi } from "../../hooks/useStoreApi";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { storeState } from "../../recoil/storeDetail";

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
import { useParams } from "react-router-dom";

function StoreInfo(props) {
	const { sId } = useParams();
	const store = useRecoilValue(storeState);

	const storeApi = useStoreInfoApi();
	const toggleApi = useToggleApi();

	useEffect(() => {
		storeApi(sId);
	}, []);

	// on/off 토글 클릭 핸들러
	const handleClickToggle = () => {
		toggleApi(sId);
	};

	return (
		<StoreInfoContainer>
			{/* 헤더(사장, 고객 구분) */}
			<Header>
				<BoldText BoldText size="19">
					{store?.name}
				</BoldText>
				{/* 조건부 렌더링: 사장님 -> 토글 */}
				<OnOffToggle onClick={handleClickToggle} isOn={store.isOnair === "ON" ? true : false}>
					<OnOff isOn={store.isOnair === "ON" ? true : false}>{store.isOnair}</OnOff>
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
