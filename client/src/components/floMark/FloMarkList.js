import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	FloMarkListContianer,
	TextContainer,
	ShadowCardContent,
	RowContainer,
} from "../../styles/floMark/FloMarkListStyle";
import { EmptyContainer, BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";

import Image from "../../assets/store.png";

function FloMarkList(props) {
	const navigate = useNavigate();

	const [stores, setStores] = useState([]);

	const handleClickStore = () => {
		navigate("/store/detail");
	};

	useEffect(() => {
		// const response = axios.get(`/api/flowermarks/page=&size=`);

		const response = [
			{
				phoneNumber: "01011111111",
				address_name:
					"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem",
				start: "09:00",
				end: "18:00",
				sImg: { Image },
				sid: 1111111,
				name: "lorem",
			},
			{
				phoneNumber: "01011111111",
				address_name:
					"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem",
				start: "09:00",
				end: "18:00",
				sImg: { Image },
				sid: 1111111,
				name: "lorem",
			},
			{
				phoneNumber: "01011111111",
				address_name:
					"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem",
				start: "09:00",
				end: "18:00",
				sImg: { Image },
				sid: 1111111,
				name: "lorem",
			},
		];

		setStores(response);
	}, []);

	return (
		<FloMarkListContianer>
			{stores.length === 0 ? (
				<EmptyContainer isFull={true} exceptHeight="198">
					등록된 꽃갈피가 없어요
				</EmptyContainer>
			) : (
				<>
					{stores.map(store => (
						<ShadowCard onClick={handleClickStore} marginBottom="16">
							<ShadowCardContent>
								<div>
									<img src={store?.sImg?.Image} alt={store.storeName} />
								</div>
								<TextContainer>
									<RowContainer>
										<BoldText>{store?.name}</BoldText>
										<BoldText size="13" color="var(--primary-500)">
											가게 보기 &gt;
										</BoldText>
									</RowContainer>
									<GrayText size="13">{store?.address_name}</GrayText>
									<RowContainer>
										<GrayText size="13">
											{store?.start} : {store?.end}
										</GrayText>
										<GrayText size="13">|</GrayText>
										<GrayText size="13">{store?.phoneNumber}</GrayText>
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
