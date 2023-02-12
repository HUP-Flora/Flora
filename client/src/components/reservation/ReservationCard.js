import React from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { reservationsState } from "../../recoil/reservations";

import { useReservationRefuseApi } from "../../hooks/useReservationRefuseApi";
import { useReservationEntranceApi } from "../../hooks/useReservationEntranceApi";
import { useReservationAcceptApi } from "../../hooks/useReservationAcceptApi";

import { BoldText, EmptyContainer, GrayHr, ShadowCard } from "../../styles/common/CommonStyle";
import {
	Header,
	ContentContainer,
	GrayHrWrapper,
	OwnerButtonsContainer,
} from "../../styles/reservation/ReservationCardStyle";

import image from "../../assets/store.png";
import { GraySmallButton, Primary400SmallButton } from "../../styles/button/ButtonStyle";

function ReservationCard({ type }) {
	const navigate = useNavigate();

	const reservationRefuseApi = useReservationRefuseApi();
	const reservationEntranceApi = useReservationEntranceApi();
	const reservationAcceptApi = useReservationAcceptApi();

	const [reservations, setReservations] = useRecoilState(reservationsState);

	// 더미 데이터
	const userType = "owner";
	// const userType = "customer";

	const oId = "0000";
	const conId = "0000";

	const handleClickEntrance = () => {
		reservationEntranceApi(userType, conId);
	};

	const handleClickCancel = () => {};

	const handleClickAccept = () => {
		reservationAcceptApi(oId);
	};

	const handleClickRefuse = () => {
		reservationRefuseApi(oId);
	};

	return (
		<>
			{reservations.length === 0 ? (
				<EmptyContainer isFull={true} exceptHeight="200">
					예약된 플로라이브가 없어요.
				</EmptyContainer>
			) : (
				reservations.map((reservation, index) => (
					<ShadowCard key={index} marginBottom="16">
						<Header>
							<div>
								<BoldText>{reservation.date}</BoldText>
								<BoldText>{reservation.time}</BoldText>
							</div>
							{
								type === "confirm" &&
									(reservation.status === "entrance" ? (
										<Primary400SmallButton onClick={() => navigate("/flolive/waiting")}>
											입장
										</Primary400SmallButton>
									) : (
										<GraySmallButton disabled>대기 중</GraySmallButton>
									))
								// : (
								// 	userType !== "owner" && (
								// 		<GraySmallButton onClick={handleClickCancel}>예약 취소</GraySmallButton>
								// 	)
								// )
							}
						</Header>
						<GrayHrWrapper>
							<GrayHr />
						</GrayHrWrapper>
						<ContentContainer>
							<img src={reservation.image?.image} alt="" />
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
				))
			)}
		</>
	);
}

export default ReservationCard;
