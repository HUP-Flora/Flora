import { BorderTopButtonToolBar } from "../../styles/bar/BarStyle";
import { InfoCard } from "../../components/payment/success/InfoCard";
import { MessageCard } from "../../components/payment/success/MessageCard";
import { BlankSection } from "../../styles/common/CommonStyle";
import { Primary50Button, WhiteButton } from "../../styles/button/ButtonStyle";
import { Gray50Container, Gray50Padding16Container } from "../../styles/container/ContainerStyle";
import { WidthDoubleButtonToolBar } from "../../styles/bar/BarStyle";
import { useEffect } from "react";
import { useLoadOrderDataApi } from "../../hooks/useLoadOrderDataApi";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OrderSuccessDataState } from "../../recoil/flolive";
import { PaymentSuccessButtonSection } from "../../styles/common/SectionStyle";

export function KakaoPaymentSuccess() {
	const { oId } = useParams();
	const loadOrderDataApi = useLoadOrderDataApi();
	const { sname, addressName, payment, phoneNumber, recType, recDeliveryDestination } =
		useRecoilValue(OrderSuccessDataState);

	const navigate = useNavigate();

	useEffect(() => {
		loadOrderDataApi(oId);
	}, []);

	return (
		<Gray50Padding16Container>
			<MessageCard />
			<BlankSection height="16" />
			<InfoCard
				type="가게 정보"
				content1={sname}
				content2={addressName ? addressName.replace("/", " ") : "-"}
				content3={phoneNumber}
			/>
			<BlankSection height="16" />
			<InfoCard
				type="주문 정보"
				content1={recType}
				content2={recDeliveryDestination ? recDeliveryDestination.replace("/", " ") : "-"}
				content3={payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
			/>
			<BlankSection height="16" />
			<PaymentSuccessButtonSection>
				<WidthDoubleButtonToolBar>
					<Primary50Button
						onClick={() => {
							navigate(`/mypage/order/${oId}`);
						}}
					>
						주문 상세 보기
					</Primary50Button>
					<WhiteButton
						onClick={() => {
							navigate("/");
						}}
					>
						홈으로 이동
					</WhiteButton>
				</WidthDoubleButtonToolBar>
			</PaymentSuccessButtonSection>
		</Gray50Padding16Container>
	);
}
