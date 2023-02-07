import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { KakaoLoginButton } from "../../styles/button/ButtonStyle";
import { KakaoLogo, WhiteLayout } from "../../styles/common/CommonStyle";
import KakaoLogoImg from "../../assets/kakao/KakaoLogo.png";

export function Login() {
	return (
		<WhiteLayout>
			<ButtonToolBar>
				<a href={`${process.env.REACT_APP_SERVER_URL}/oauth2/authorization/kakao`} alt="_self">
					<KakaoLoginButton>
						<KakaoLogo src={KakaoLogoImg} alt="KakaoLogo" />
						<span>카카오톡으로 시작하기</span>
					</KakaoLoginButton>
				</a>
			</ButtonToolBar>
		</WhiteLayout>
	);
}
