import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { KakaoLoginButton } from "../../styles/button/ButtonStyle";
import { KakaoLogo } from "../../styles/common/CommonStyle";
import { useNavigate } from "react-router-dom";
import KakaoLogoImg from "../../assets/kakao/KakaoLogo.png";
import axios from "axios";
import { WhiteContainer } from "../../styles/container/ContainerStyle";
import { useState } from "react";

export function Login() {
	const [redirect, setRedirect] = useState(false);

	const navigate = useNavigate();
	const handleLogin = () => {
		setRedirect(true);
		// axios({
		// 	method: "POST",
		// 	url: process.env.REACT_APP_SERVER_URL + "/auth/login",
		// })
		// 	.then(res => {
		// 		// 로그인 성공 & 기존 사용자 - 토큰 저장 후 페이지 이동
		// 		// navigate("/")
		// 		// 로그인 성공 & 기존 사용자 X - 페이지 이동
		// 		navigate("/signup");
		// 		// 로그인 실패 - 아무 일도 일어나지 않음?
		// 	})
		// 	.catch(err => {});
		navigate("/signup");
	};

	return (
		<WhiteContainer>
			<ButtonToolBar>
				<a href="www.naver.com">test</a>
				<KakaoLoginButton onClick={handleLogin}>
					<KakaoLogo src={KakaoLogoImg} alt="KakaoLogo" />
					<span>카카오톡으로 시작하기</span>
				</KakaoLoginButton>
			</ButtonToolBar>
		</WhiteContainer>
	);
}
