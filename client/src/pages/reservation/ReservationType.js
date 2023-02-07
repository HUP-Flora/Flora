import {
	ButtonImage,
	FirstWhiteLargeButton,
	GrayText,
	SecondWhiteLargeButton,
	ReserVationTypeContainer,
	ReservationTypeContent,
	ReservationTypeTitle,
} from "../../styles/reservation/ReservationStyle";
import StatusBar from "../../components/common/StatusBar";
import deleveryGRAYimage from "../../assets/reservation/DeliveryButtonFormImage_GRAY.png";
import pickupGRAYimage from "../../assets/reservation/FirstFormPickUpImage_GRAY.png";
import deliveryPINKimage from "../../assets/reservation/DeliveryButtonFormImage.png";
import pickupPinkImage from "../../assets/reservation/FirstFormPickUpImage.png";
import NextButton from "../../components/common/NextButton";
import { useRecoilState } from "recoil";
import { RisModalShowState, RorderTypeState } from "../../recoil/reservation";
import { useNavigate } from "react-router-dom";
import ReservationWarningModal from "../../components/reservation/ReservationWarningModal";

function ReservationType() {
	const [orderType, setOrderType] = useRecoilState(RorderTypeState);

	const [RisModalShow, setRisModalShow] = useRecoilState(RisModalShowState);

	const navigate = useNavigate();
	const typeNextHandler = () => {
		if (orderType === "") {
			setRisModalShow(true);
			return;
		}
		// navigate("/product/:product-id/reservation/date");
		navigate("/reservation/date");
	};

	return (
		<>
			<StatusBar text="플로라이브 예약" />
			<ReserVationTypeContainer>
				<ReservationTypeTitle>상품을 어떻게 보내시겠어요 <p>?</p></ReservationTypeTitle>
				<ReservationTypeContent>배송 유형을 선택해주세요</ReservationTypeContent>
				<FirstWhiteLargeButton
					onClick={() => setOrderType("DELIVERY")}
					isClick={orderType === "DELIVERY"}
				>
					<ButtonImage src={orderType === "DELIVERY" ? deliveryPINKimage : deleveryGRAYimage} />
					<GrayText isClick={orderType === "DELIVERY"}>배달로 보낼게요</GrayText>
				</FirstWhiteLargeButton>
				<SecondWhiteLargeButton
					onClick={() => setOrderType("PICKUP")}
					isClick={orderType === "PICKUP"}
				>
					<ButtonImage src={orderType === "PICKUP" ? pickupPinkImage : pickupGRAYimage} />
					<GrayText isClick={orderType === "PICKUP"}>직접 가져갈게요</GrayText>
				</SecondWhiteLargeButton>
			</ReserVationTypeContainer>
			<NextButton text="다음으로" onClick={typeNextHandler} />
			{RisModalShow && <ReservationWarningModal text="배송유형을 선택해주세요." />}
		</>
	);
}

export default ReservationType;
