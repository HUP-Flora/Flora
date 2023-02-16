import React from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { reservationsState } from "../../recoil/reservations";

import { useReservationWaitingApi } from "../../hooks/useReservationWaitingApi";
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
import { userInfoTypeState } from "../../recoil/userInfo";

function ReservationCard({ type }) {
	const navigate = useNavigate();

	const reservationWaitingApi = useReservationWaitingApi();
	const reservationRefuseApi = useReservationRefuseApi();
	const reservationEntranceApi = useReservationEntranceApi();
	const reservationAcceptApi = useReservationAcceptApi();

	const userType = useRecoilValue(userInfoTypeState);
	const [reservations, setReservations] = useRecoilState(reservationsState);

	const handleClickEntrance = reservation => {
		reservationEntranceApi(reservation.conId);
		navigate(`/flolive/${reservation.oid}/${reservation.conId}`);
	};

	const handleClickAccept = oId => {
		reservationAcceptApi(oId);
		// 일단 무한스크롤 없이 전체 불러오게 했습니다(희제)
		// reservationWaitingApi(type, 0, 5);
		// reservationWaitingApi();
	};

	const handleClickRefuse = oId => {
		reservationRefuseApi(oId);
		// 일단 무한스크롤 없이 전체 불러오게 했습니다(희제)
		// reservationWaitingApi(type, 0, 5);
	};

	return (
		<>
			{reservations.length === 0 ? (
				<EmptyContainer isFull={true} exceptHeight="200">
					예약된 플로라이브가 없어요.
				</EmptyContainer>
			) : (
				reservations.reverse().map((reservation, index) => (
					<ShadowCard key={index} marginBottom="16">
						<Header>
							<div>
								<BoldText>{reservation?.reservationDate}</BoldText>
								<BoldText>{reservation?.reservationTime}</BoldText>
							</div>
							{
								type === "confirm" &&
									(reservation?.check ? (
										<Primary400SmallButton onClick={reservation => handleClickEntrance}>
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
						{type !== "waiting" && userType === "STORE" && (
							<GrayHrWrapper>
								<GrayHr />
							</GrayHrWrapper>
						)}
						<ContentContainer>
							{type !== "waiting" && userType === "STORE" && <img src={reservation?.pimg} alt="" />}
							{/* <img src={reservation?.pimg} alt="" /> */}
							<div>
								<BoldText>{reservation?.sname}</BoldText>
								<div>{reservation?.pname}</div>
							</div>
						</ContentContainer>
						{type === "waiting" && userType === "STORE" && (
							<OwnerButtonsContainer>
								<Primary400SmallButton
									onClick={() => {
										handleClickAccept(reservation.oid);
									}}
								>
									수락
								</Primary400SmallButton>
								<GraySmallButton
									onClick={() => {
										handleClickRefuse(reservation.oid);
									}}
								>
									거절
								</GraySmallButton>
							</OwnerButtonsContainer>
						)}
					</ShadowCard>
				))
			)}
		</>
	);
}

export default ReservationCard;
