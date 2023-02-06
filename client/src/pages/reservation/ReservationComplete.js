import {
	HomeButton,
	OrderInfoButton,
	RcompleteContainer,
	RcompleteContent,
	RcompleteTitle,
	ShopImage,
	ShopInfoContainer,
	ShopName,
} from "../../styles/reservation/ReservationCompleteStyle";
import { useNavigate } from "react-router-dom";

function ReservationComplete() {
	const navigate = useNavigate();

	const onClickOrderInfo = () => {
		// TODO: 주문 내역으로 이동하기
		// navigate("/orderinfo");
	};

	const onClickHome = () => {
		navigate("/");
	};

	return (
		<RcompleteContainer>
			<RcompleteTitle>예약이 완료되었습니다.</RcompleteTitle>
			<RcompleteContent>
				플로라이브 확정 여부는
				<br />
				빠른 시간 내에 알려드릴게요!
			</RcompleteContent>
			<ShopInfoContainer>
				<ShopImage
					src={
						"https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4146050202/B.jpg?642000000"
					}
				/>
				<ShopName>꽃집이요</ShopName>
			</ShopInfoContainer>
			<OrderInfoButton onClick={onClickOrderInfo}>주문 내역으로 이동하기</OrderInfoButton>
			<HomeButton onClick={onClickHome}>홈으로 이동하기</HomeButton>
		</RcompleteContainer>
	);
}

export default ReservationComplete;
