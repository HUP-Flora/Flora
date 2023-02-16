import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FullScreenFrame } from "../../styles/payment/KakaoPaymentStyle";
import { KakaoPaymentButton } from "../../styles/button/ButtonStyle";
import KakaoPayLogoImg from "../../assets/kakao/KakaoPayLogo.png";
import MediumKakaoPayLogoImg from "../../assets/kakao/MediumKakaoPayLogo.png";
import { KakaoPayLogo, KakaoPayText } from "../../styles/common/CommonStyle";
import api from "../../utils/api";
import { useRecoilValue } from "recoil";
import { orderStatesState } from "../../recoil/chatting";

export function KakaoPayment({ oId, isLargeButton }) {
	const [redirectUrl, setRedirectUrl] = useState("");
	// const { oId } = useParams();
	const orderStates = useRecoilValue(orderStatesState);

	const handleKakaoPayment = () => {
		// api({
		// 	method: "GET",
		// 	url: `/orders/${oId}`,
		// }).then(response => {
		// 	const { pName } = response.data;
		// const data = {
		// 	cid: "TC0ONETIME",
		// 	partner_order_id: "partner_order_id",
		// 	partner_user_id: "partner_user_id",
		// 	// item_name: pName,
		// 	quantity: 1,
		// 	total_amount: orderStates.paymentAmount,
		// 	vat_amount: parseInt(orderStates.paymentAmount / 11),
		// 	tax_free_amount: 0,
		// 	approval_url: process.env.REACT_APP_URL + "/flolive/kakao-payment/success",
		// 	fail_url: process.env.REACT_APP_URL + `/mypage/order/${oId}`,
		// 	cancel_url: process.env.REACT_APP_URL + `/mypage/order/${oId}`,
		// };

		api({
			url: `/pay/${oId}`,
			method: "POST",
			// headers: {
			// 	Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_ADMIN_KEY,
			// 	"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
			// },
			// data,
		}).then(response => {
			const {
				data: { next_redirect_pc_url, next_redirect_mobile_url, tid },
			} = response;

			// 추후 next_redirect_mobile_url로 바꿀 것
			window.location.replace(next_redirect_pc_url);
		});
		// });
	};

	return (
		<KakaoPaymentButton isLargeButton={isLargeButton} onClick={handleKakaoPayment}>
			<KakaoPayLogo isLargeButton={isLargeButton} src={KakaoPayLogoImg} alt="KakaoPayLogo" />
			<KakaoPayText isLargeButton={isLargeButton}>결제 및 종료</KakaoPayText>
		</KakaoPaymentButton>
	);
}
