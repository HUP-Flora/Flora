import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { KakaoLoginButton } from "../../styles/button/ButtonStyle";
import { KakaoLogo, WhiteLayout } from "../../styles/common/CommonStyle";
import KakaoLogoImg from "../../assets/kakao/KakaoLogo.png";
import { useEffect } from "react";

import LoginContent from "../../components/login/LoginContent";
import LoginButton from "../../components/login/LoginButton";

import { Container } from "../../styles/login/LoginStyle";

export function Login() {
	useEffect(() => {
		localStorage.removeItem("AccessToken");
	}, []);
	return (
		<Container>
			<LoginContent />
			
			<LoginButton />
		</Container>
	);
}
