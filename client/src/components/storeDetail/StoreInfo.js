import React, { useState, useEffect } from "react";

import { useStoreInfoApi } from "../../hooks/useStoreInfoApi";
import { useToggleApi } from "../../hooks/useToggleApi";

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

import defaultImg from "../../assets/default-store.png";
import { useParams } from "react-router-dom";
import { ownersIdState, userInfoTypeState } from "../../recoil/userInfo";

function StoreInfo({ isMyStore }) {
	const { sId } = useParams();
	const store = useRecoilValue(storeState);
	const userInfoType = useRecoilValue(userInfoTypeState);

	const storeApi = useStoreInfoApi();
	const toggleApi = useToggleApi();

	useEffect(() => {
		storeApi(sId);
	}, []);

	// on/off 토글 클릭 핸들러
	const handleClickToggle = () => {
		toggleApi();
	};

	const formatAddressName = addressName => {
		return addressName?.replace("/", " ");
	};

	return (
		<StoreInfoContainer>
			{/* 헤더(사장, 고객 구분) */}
			<Header>
				<BoldText BoldText size="19">
					{store?.name}
				</BoldText>
				{/* 조건부 렌더링: 사장님 -> 토글 */}
				{isMyStore && (
					<OnOffToggle onClick={handleClickToggle} isOn={store.isOnair === "ON" ? true : false}>
						<OnOff isOn={store.isOnair === "ON" ? true : false}>{store.isOnair}</OnOff>
					</OnOffToggle>
				)}
			</Header>
			<InfoContainer>
				<ImageWrapper>
					<Image src={store?.simg === null ? defaultImg : store?.simg} alt="store-img" />
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
					<Text size="13">{formatAddressName(store?.address_name)}</Text>
					<Text size="13">매주 {store?.holiday}요일 휴무</Text>
				</BasicInfoRow>
			</BasicInfoContainer>
		</StoreInfoContainer>
	);
}

export default StoreInfo;
