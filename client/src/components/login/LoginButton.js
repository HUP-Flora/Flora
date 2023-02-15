import React from "react";

import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { KakaoLoginButton } from "../../styles/button/ButtonStyle";
import { KakaoLogo, WhiteLayout } from "../../styles/common/CommonStyle";
import KakaoLogoImg from "../../assets/kakao/KakaoLogo.png";
import { useEffect } from "react";
import { KakaoATag } from "../../styles/login/LoginStyle";

function LoginButton(props) {
	return (
		<ButtonToolBar>
			<KakaoATag
				href={`${process.env.REACT_APP_SERVER_URL}/oauth2/authorization/kakao`}
				alt="_self"
			>
				<KakaoLoginButton>
					<KakaoLogo src={KakaoLogoImg} alt="KakaoLogo" />
					<span>카카오톡으로 시작하기</span>
				</KakaoLoginButton>
			</KakaoATag>
		</ButtonToolBar>
	);
}

export default LoginButton;
