import React from "react";
import { useNavigate } from "react-router-dom";

import {
	FloMarkListContianer,
	TextContainer,
	ShadowCardContent,
	RowContainer,
} from "../../styles/floMark/FloMarkListStyle";
import { EmptyContianer, BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";

import Image from "../../assets/store.png";

function FloMarkList(props) {
	const navigate = useNavigate();

	const handleClickStore = () => {
		navigate("/store/detail");
	};

	// 더미 데이터
	const stores = [
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
		{
			storeImg: { Image },
			storeName: "꽃집이요",
			storeAddress: "대전 유성구 원신흥동 400-11층대전 유성구 원신흥전 유성구 원신흥동 400-1, 1층",
			storeWorkingTime: "09:00 ~ 18:00",
			storeTel: "010-1234-5678",
		},
	];

	// const stores = [];

	return (
		<FloMarkListContianer>
			{stores.length === 0 ? (
				<EmptyContianer exceptHeight="168">
					{/* 빈 화면 */}
					등록된 꽃갈피가 없어요
				</EmptyContianer>
			) : (
				<>
					{stores.map(store => (
						<ShadowCard onClick={handleClickStore} marginBottom="16">
							<ShadowCardContent>
								<div>
									<img src={store.storeImg.Image} alt={store.storeName} />
								</div>
								{/* 나머지 */}
								<TextContainer>
									{/* 첫 줄 */}
									<RowContainer>
										<BoldText>{store.storeName}</BoldText>
										<BoldText size="13" color="var(--primary-500)">
											가게 보기 &gt;
										</BoldText>
									</RowContainer>
									<GrayText size="13">{store.storeAddress}</GrayText>
									{/* 마지막 줄 */}
									<RowContainer>
										<GrayText size="13">{store.storeWorkingTime}</GrayText>
										<GrayText size="13">|</GrayText>
										<GrayText size="13">{store.storeTel}</GrayText>
									</RowContainer>
								</TextContainer>
							</ShadowCardContent>
						</ShadowCard>
					))}
				</>
			)}
		</FloMarkListContianer>
	);
}

export default FloMarkList;
