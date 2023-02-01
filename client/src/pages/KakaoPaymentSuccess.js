import { ButtonToolBar } from "../styles/common/ButtonToolBar";
import { InfoCard } from "../components/payment/success/InfoCard";
import { MessageCard } from "../components/payment/success/MessageCard";
import { BlankContainer } from "../styles/common/BlankStyle";
import { Primary50Button } from "../styles/common/button/Primary50Button";
import { WhiteButton } from "../styles/common/button/WhiteButton";
import { KakaoPaymentSuccessContainer } from "../styles/payment/success/KakaoPaymentSuccessStyle";
import { WidthDoubleButtonDiv } from "../styles/common/WidthDoubleButtonSection";

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
			<ButtonToolBar>
				<WidthDoubleButtonDiv>
					<Primary50Button>주문 상세 보기</Primary50Button>
					<WhiteButton>홈으로 이동</WhiteButton>
				</WidthDoubleButtonDiv>
			</ButtonToolBar>
		</KakaoPaymentSuccessContainer>
	);
}
