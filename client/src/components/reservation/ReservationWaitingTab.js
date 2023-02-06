import React from "react";

import ReservationCard from "./ReservationCard";

import { Container } from "../../styles/reservation/ReservationListStyle";

function ReservationWaitingTab(props) {
	return (
		<Container>
			<ReservationCard type="waiting" />
		</Container>
	);
}

export default ReservationWaitingTab;
