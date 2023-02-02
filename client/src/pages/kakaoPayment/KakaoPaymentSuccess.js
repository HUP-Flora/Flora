import { BorderTopButtonToolBar } from "../../styles/bar/BarStyle";
import { InfoCard } from "../../components/payment/success/InfoCard";
import { MessageCard } from "../../components/payment/success/MessageCard";
import { BlankContainer } from "../../styles/common/CommonStyle";
import { Primary50Button, WhiteButton } from "../../styles/button/ButtonStyle";
import { KakaoPaymentSuccessContainer } from "../../styles/payment/KakaoPaymentStyle";
import { WidthDoubleButtonToolBar } from "../../styles/bar/BarStyle";

export function KakaoPaymentSuccess() {
	return (
		<KakaoPaymentSuccessContainer>
			<MessageCard />
			<BlankContainer height="16px" />
			<InfoCard
				type="가게 정보"
				content1="받을 자료 1"
				content2="받을 자료 2"
				content3="받을 자료 3"
			/>
			<BlankContainer height="16px" />
			<InfoCard
				type="주문 정보"
				content1="받을 자료 1"
				content2="받을 자료 2"
				content3="받을 자료 3"
			/>
			<BorderTopButtonToolBar>
				<WidthDoubleButtonToolBar>
					<Primary50Button>주문 상세 보기</Primary50Button>
					<WhiteButton>홈으로 이동</WhiteButton>
				</WidthDoubleButtonToolBar>
			</BorderTopButtonToolBar>
		</KakaoPaymentSuccessContainer>
	);
}
