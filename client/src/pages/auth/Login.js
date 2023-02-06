import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { KakaoLoginButton } from "../../styles/button/ButtonStyle";
import { KakaoLogo, WhiteLayout } from "../../styles/common/CommonStyle";
import { useNavigate } from "react-router-dom";
import KakaoLogoImg from "../../assets/kakao/KakaoLogo.png";
import axios from "axios";
import { WhiteContainer } from "../../styles/container/ContainerStyle";
import { useState } from "react";
import { FullScreenFrame } from "../../styles/payment/KakaoPaymentStyle";

export function Login() {
	const [redirectUrl, setRedirectUrl] = useState("");

	const navigate = useNavigate();
	const handleLogin = () => {
		axios({
			method: "POST",
			url: process.env.REACT_APP_SERVER_URL + "/oauth2/authorization/kakao",
		})
			.then(res => {
				console.log(res);
				// 로그인 성공 & 기존 사용자 - 토큰 저장 후 페이지 이동
				// navigate("/")
				// 로그인 성공 & 기존 사용자 X - 페이지 이동
				// navigate("/signup");
				// 로그인 실패 - 아무 일도 일어나지 않음?
			})
			.catch(err => {});
	};

	return (
		<WhiteLayout>
			<ButtonToolBar>
				<a
					href={`${process.env.REACT_APP_SERVER_URL}/oauth2/authorization/kakao`}
					onClick={handleLogin}
					alt="_self"
				>
					<KakaoLoginButton>
						<KakaoLogo src={KakaoLogoImg} alt="KakaoLogo" />
						<span>카카오톡으로 시작하기</span>
					</KakaoLoginButton>
				</a>
			</ButtonToolBar>
		</WhiteLayout>
	);
}
