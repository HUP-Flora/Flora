import React from "react";

import { useNavigate } from "react-router-dom";

import { BoldText } from "../../styles/common/CommonStyle";
import { BannerContainer } from "../../styles/main/MainStyle";

import Banner from "../../assets/main/main-flolive-banner.png";

function MainFLolive(props) {
	const navigate = useNavigate();

	return (
		<BannerContainer onClick={() => navigate(`/search`)}>
			<BoldText size="19">플로라이브</BoldText>
			<img src={Banner} alt="flolive-banner" />
		</BannerContainer>
	);
}

export default MainFLolive;
