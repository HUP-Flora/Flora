import React, { useEffect } from "react";

import { useReservationWaitingApi } from "../../hooks/useReservationWaitingApi";

import ReservationCard from "./ReservationCard";

import { Container } from "../../styles/reservation/ReservationListStyle";

function ReservationWaitingTab(props) {
	const reservationWaitingApi = useReservationWaitingApi();

	// 더미 데이터 
	const type = 'customer' 
	// const type = 'owner' 

	useEffect(() => {
		reservationWaitingApi(type, 0, 5);
	}, []);

	return (
		<Container>
			<ReservationCard type="waiting" />
		</Container>
	);
}

export default ReservationWaitingTab;
