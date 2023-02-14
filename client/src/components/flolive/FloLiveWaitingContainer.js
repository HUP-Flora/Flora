import React from "react";

import spinner from "../../assets/flolive/spinner.png";
import { GrayText } from "../../styles/common/CommonStyle";
import { Container } from "../../styles/flolive/FloliveWaitingContainerStyle";

function FloLiveWaitingContainer() {
	return (
		<Container>
			<div>
				<img src={spinner} alt="spinner" />
				<GrayText size="19">사장님의 응답을 기다리는 중입니다...</GrayText>
			</div>
		</Container>
	);
}

export default FloLiveWaitingContainer;
