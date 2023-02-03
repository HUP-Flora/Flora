import {
	ButtonImage,
	DeliveryButton,
	GrayText,
	PickUpButton,
	ReserVationTypeContainer,
	ReservationTypeContent,
	ReservationTypeTitle,
} from "./ReservationStyle";
import StatusBar from "../../components/common/StatusBar";
import deleveryGRAYimage from "../../assets/reservation/DeliveryButtonFormImage_GRAY.png";
import pickupGRAYimage from "../../assets/reservation/FirstFormPickUpImage_GRAY.png";
import deliveryPINKimage from "../../assets/reservation/DeliveryButtonFormImage.png";
import pickupPinkImage from "../../assets/reservation/FirstFormPickUpImage.png";
import NextButton from "../../components/common/NextButton";
import { useRecoilState } from "recoil";
import { RorderTypeState } from "../../recoil/reservation";

function ReservationType() {
	const [orderType, setOrderType] = useRecoilState(RorderTypeState);

	return (
		<>
			<StatusBar text="플로라이브 예약" />
			<ReserVationTypeContainer>
				<ReservationTypeTitle>상품을 어떻게 보내시겠어요?</ReservationTypeTitle>
				<ReservationTypeContent>배송 유형을 선택해주세요</ReservationTypeContent>
				<DeliveryButton onClick={() => setOrderType("DELIVERY")} isClick={orderType === "DELIVERY"}>
					<ButtonImage src={orderType === "DELIVERY" ? deliveryPINKimage : deleveryGRAYimage} />
					<GrayText isClick={orderType === "DELIVERY"}>배달로 보낼게요</GrayText>
				</DeliveryButton>
				<PickUpButton onClick={() => setOrderType("PICKUP")} isClick={orderType === "PICKUP"}>
					<ButtonImage src={orderType === "PICKUP" ? pickupPinkImage : pickupGRAYimage} />
					<GrayText isClick={orderType === "PICKUP"}>직접 가져갈게요</GrayText>
				</PickUpButton>
			</ReserVationTypeContainer>
			<NextButton text="다음으로" />
		</>
	);
}

export default ReservationType;
