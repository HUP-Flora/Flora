import React, { useEffect } from "react";

import { useReservationWaitingApi } from "../../hooks/useReservationWaitingApi";

import ReservationCard from "./ReservationCard";

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userInfoTypeState } from "../../recoil/userInfo";
import { reservationsState } from "../../recoil/reservations";

import { Container } from "../../styles/reservation/ReservationListStyle";

function ReservationWaitingTab(props) {
	const reservationWaitingApi = useReservationWaitingApi();

	const userType = useRecoilValue(userInfoTypeState);

	const resetReservation = useResetRecoilState(reservationsState);

	useEffect(() => {
		resetReservation();
		reservationWaitingApi(userType, 0, 5);
	}, []);

	return (
		<Container>
			<ReservationCard type="waiting" />
		</Container>
	);
}

export default ReservationWaitingTab;
