import React, { useEffect } from "react";

import { useReservationConfirmApi } from "../../hooks/useReservationConfirmApi";

import ReservationCard from "./ReservationCard";

import { Container } from "../../styles/reservation/ReservationListStyle";

function ReservationConfirmTab(props) {
	const confirmReservationsApi = useReservationConfirmApi();

	// 더미 데이터
	const type = "customer";
	// const type = 'owner'

	useEffect(() => {
		confirmReservationsApi(type, 0, 5);
	}, []);

	return (
		<Container>
			<ReservationCard type="confirm" />
		</Container>
	);
}

export default ReservationConfirmTab;
