import React from "react";

import spinner from "../../assets/flolive/spinner.png";
import { GrayText } from "../../styles/common/CommonStyle";
import { Container } from "../../styles/flolive/FloliveWaitingContainerStyle";
import lottie from "lottie-web";

function FloLiveWaitingContainer() {
	const loadingLottie = React.useRef();
	React.useEffect(() => {
		lottie.loadAnimation({
			container: loadingLottie.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: require("../../assets/flolive/loading_lottie.json"),
		});
	}, []);

	return (
		<Container>
			<div>
				<div ref={loadingLottie}></div>
				<GrayText size="19">사장님의 응답을 기다리는 중입니다...</GrayText>
			</div>
		</Container>
	);
}

export default FloLiveWaitingContainer;
