import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { KakaoPaymentFrame } from "../../styles/payment/KakaoPaymentStyle";
import { KakaoPaymentButton } from "../../styles/button/ButtonStyle";
import KakaoPayLogoImg from "../../assets/kakao/KakaoPayLogo.png";
import { KakaoPayLogo, KakaoPayText } from "../../styles/common/CommonStyle";

export function KakaoPayment() {
	const [redirectUrl, setRedirectUrl] = useState("");

	const params = {
		cid: "TC0ONETIME",
		partner_order_id: "partner_order_id",
		partner_user_id: "partner_user_id",
		item_name: "안개꽃 한 송이",
		quantity: 1,
		total_amount: 10000,
		vat_amount: 919,
		tax_free_amount: 0,
		approval_url: process.env.REACT_APP_URL + "/kakao-payment/success",
		fail_url: process.env.REACT_APP_URL + "/",
		cancel_url: process.env.REACT_APP_URL + "/",
	};

	const handleKakaoPayment = () => {
		axios({
			url: "https://kapi.kakao.com/v1/payment/ready",
			method: "POST",
			headers: {
				Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_ADMIN_KEY,
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
			},
			params,
		}).then(response => {
			const {
				data: { next_redirect_pc_url, next_redirect_mobile_url, tid },
			} = response;

			// 추후 next_redirect_mobile_url로 바꿀 것
			setRedirectUrl(next_redirect_pc_url);
			console.log(next_redirect_pc_url, next_redirect_mobile_url, tid);
		});
	};

	return (
		<>
			{redirectUrl ? (
				<KakaoPaymentFrame title="kakaoPaymentFrame" src={redirectUrl}></KakaoPaymentFrame>
			) : (
				<>
					<Link to={"/"}>뒤로 가기</Link>
					<br />
					<br />

					<KakaoPaymentButton onClick={handleKakaoPayment}>
						<KakaoPayLogo src={KakaoPayLogoImg} alt="KakaoPayLogo" />
						<KakaoPayText>결제 및 종료</KakaoPayText>
					</KakaoPaymentButton>
				</>
			)}
		</>
	);
}
