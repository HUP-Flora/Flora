import React from "react";

import ReservationCard from "./ReservationCard";

import { Container } from "../../styles/reservation/ReservationListStyle";

function ReservationConfirmTab(props) {
	return (
		<Container>
			<ReservationCard type="confirm" />
		</Container>
	);
}

export default ReservationConfirmTab;
