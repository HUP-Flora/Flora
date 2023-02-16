import React from "react";

import { SearchBar } from "../../components/common/SearchBar";

import {
	Container,
	ContentContainer,
	TextContainer,
	LogoWrapper,
	SearchBarContainer,
} from "../../styles/main/MainTopBannerStyle";

import { BoldText, Text } from "../../styles/common/CommonStyle";

import Logo from "../../assets/logo-flower.png";
import Logo_White from "../../assets/logo-main-white.png";
import MainTopBanner1 from "../../assets/main/main-top-banner-1.gif";
import MainTopBanner2 from "../../assets/main/main-top-banner-2.gif";

function MainTopBanner(props) {
	return (
		<Container>
			<ContentContainer>
				<TextContainer>
					<Text font="nexon" size="13">
						오늘 커스텀, 오늘 배송
					</Text>
					<Text font="nexon" size="28">
						꽃으로 전하는
						<Text font="nexon" size="28">
							가장&nbsp;
							<BoldText font="nexon" size="28">
								빠른&nbsp;
							</BoldText>
							마음
						</Text>
					</Text>
				</TextContainer>
				<LogoWrapper>
					{/* <img src={Logo} alt="logo" /> */}
					<img src={Logo_White} alt="logo" />
				</LogoWrapper>
				<img src={MainTopBanner1} alt="main-top-banner-1" />
				<img src={MainTopBanner2} alt="main-top-banner-2" />
			</ContentContainer>
			<SearchBarContainer>
				<Text size="13">원하시는 날짜와 지역을 선택해주세요.</Text>
				<SearchBar />
			</SearchBarContainer>
		</Container>
	);
}

export default MainTopBanner;
