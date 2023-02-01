import { ButtonToolBar } from "../styles/bar/BarStyle";
import { KakaoLoginButton } from "../styles/button/ButtonStyle";
import { KakaoLogoImg } from "../styles/common/CommonStyle";
// import { useNavigate } from "react-router-dom";
import KakaoLogo from "../assets/kakao/KakaoLogo.png";
import axios from "axios";

export function Login() {
	// const navigate = useNavigate();
	const handleLogin = () => {
		axios({
			method: "POST",
			url: process.env.REACT_APP_SERVER_URL + "/auth/login",
		})
			.then(res => {
				// 로그인 성공 & 기존 사용자
				// navigate("/")
				// 로그인 성공 & 기존 사용자 X
				// navigate("/signup")
				// 로그인 실패
			})
			.catch(err => {});
	};

	return (
		<div>
			<ButtonToolBar>
				<KakaoLoginButton onClick={handleLogin}>
					<KakaoLogoImg src={KakaoLogo} alt="KakaoLogo" />
					<span>카카오톡으로 시작하기</span>
				</KakaoLoginButton>
			</ButtonToolBar>
		</div>
	);
}
