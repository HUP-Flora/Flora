import {
	ButtonImage,
	DeliveryButton,
	GrayText,
	PickUpButton,
	ReserVationTypeContainer,
	ReservationTypeContent,
	ReservationTypeTitle,
} from "./ReservationTypeStyle";
import StatusBar from "../../components/common/StatusBar";
import deleveryGRAYimage from "../../assets/reservation/DeliveryButtonFormImage_GRAY.png";
import pickupGRAYimage from "../../assets/reservation/FirstFormPickUpImage_GRAY.png";
import NextButton from "../../components/common/NextButton";

function ReservationType() {
	return (
		<>
			<StatusBar text="플로라이브 예약" />
			<ReserVationTypeContainer>
				<ReservationTypeTitle>상품을 어떻게 보내시겠어요?</ReservationTypeTitle>
				<ReservationTypeContent>배송 유형을 선택해주세요</ReservationTypeContent>
				<DeliveryButton>
					<ButtonImage src={deleveryGRAYimage} />
					<GrayText>배달로 보낼게요</GrayText>
				</DeliveryButton>
				<PickUpButton>
					<ButtonImage src={pickupGRAYimage} />
					<GrayText>직접 가져갈게요</GrayText>
				</PickUpButton>
			</ReserVationTypeContainer>
			<NextButton text="다음으로" />
		</>
	);
}

export default ReservationType;
