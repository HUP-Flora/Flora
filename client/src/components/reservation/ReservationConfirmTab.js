import React, { useEffect } from "react";

import { useReservationConfirmApi } from "../../hooks/useReservationConfirmApi";

import ReservationCard from "./ReservationCard";

import { Container } from "../../styles/reservation/ReservationListStyle";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userInfoTypeState } from "../../recoil/userInfo";
import { reservationsState } from "../../recoil/reservations";

function ReservationConfirmTab(props) {
	const confirmReservationsApi = useReservationConfirmApi();

	const userType = useRecoilValue(userInfoTypeState);

	const resetReservation = useResetRecoilState(reservationsState);

	useEffect(() => {
		resetReservation();
		confirmReservationsApi(userType, 0, 5);
	}, []);

	return (
		<Container>
			<ReservationCard type="confirm" />
		</Container>
	);
}

export default ReservationConfirmTab;
