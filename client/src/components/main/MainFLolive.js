import React from "react";
import { BoldText } from "../../styles/common/CommonStyle";

import Banner from "../../assets/main/main-flolive-banner.png";

function MainFLolive(props) {
	return (
		<div>
			<BoldText size="19">플로라이브 알아보기</BoldText>
			<img src={Banner} alt="flolive-banner" />
		</div>
	);
}

export default MainFLolive;
