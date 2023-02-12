import React from "react";

import { BoldText, Text } from "../../styles/common/CommonStyle";
import { ContentContainer, TextContainer, MainImgWrapper } from "../../styles/login/LoginStyle";

import logoImg from "../../assets/logo-flower.png";
import mainImg from "../../assets/login-main.gif";

function LoginContent(props) {
	return (
		<ContentContainer>
			<div>
				<img src={logoImg} alt="logo" />
				<TextContainer>
					<Text font="nexon" size="33">
						꽃으로 전하는
					</Text>
					<Text font="nexon" size="33">
						가장&nbsp;
						<BoldText font="nexon" size="33">
							빠른&nbsp;
						</BoldText>
						마음
					</Text>
				</TextContainer>
			</div>
			<MainImgWrapper>
				<img src={mainImg} alt="main" />
			</MainImgWrapper>
		</ContentContainer>
	);
}

export default LoginContent;
