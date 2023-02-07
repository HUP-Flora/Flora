import React from "react";

import { BoldText, GrayHr, ShadowCard } from "../../styles/common/CommonStyle";
import {
	Header,
	ContentContainer,
	GrayHrWrapper,
	OwnerButtonsContainer,
} from "../../styles/reservation/ReservationCardStyle";

import image from "../../assets/store.png";
import { GraySmallButton, Primary400SmallButton } from "../../styles/button/ButtonStyle";

function ReservationCard({ type }) {
	const handleClickEntrance = () => {};

	const handleClickCancel = () => {};

	const handleClickAccept = () => {};

	const handleClickRefuse = () => {};

	// 더미 데이터
	const userType = "owner";
	// const userType = "customer";

	const reservations = [
		{
			image: { image },
			name: "꽃 파는 가게",
			title: "시그니처",
			price: "15000",
			date: "2023.01.20",
			time: "19:00",
			status: "entrance",
		},
		{
			image: { image },
			name: "꽃 파는 가게",
			title: "시그니처",
			price: "15000",
			date: "2023.01.20",
			time: "19:00",
			status: "waiting",
		},
	];

	return (
		<>
			{reservations.map(reservation => (
				<ShadowCard marginBottom="16">
					<Header>
						<div>
							<BoldText>{reservation.date}</BoldText>
							<BoldText>{reservation.time}</BoldText>
						</div>
						{type === "confirm" ? (
							reservation.status === "entrance" ? (
								<Primary400SmallButton onClick={handleClickEntrance}>입장</Primary400SmallButton>
							) : (
								<GraySmallButton disabled>대기 중</GraySmallButton>
							)
						) : (
							userType !== "owner" && (
								<GraySmallButton onClick={handleClickCancel}>예약 취소</GraySmallButton>
							)
						)}
					</Header>
					<GrayHrWrapper>
						<GrayHr />
					</GrayHrWrapper>
					<ContentContainer>
						<img src={reservation.image.image} alt="" />
						<div>
							<BoldText>{reservation.name}</BoldText>
							<div>{reservation.title}</div>
							<div>{reservation.price} 원</div>
						</div>
					</ContentContainer>
					{type === "waiting" && userType === "owner" && (
						<OwnerButtonsContainer>
							<Primary400SmallButton onClick={handleClickAccept}>수락</Primary400SmallButton>
							<GraySmallButton onClick={handleClickRefuse}>거절</GraySmallButton>
						</OwnerButtonsContainer>
					)}
				</ShadowCard>
			))}
		</>
	);
}

export default ReservationCard;
