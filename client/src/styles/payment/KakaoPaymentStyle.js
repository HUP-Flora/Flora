import styled from "styled-components";

export const KakaoPaymentFrame = styled.iframe`
	overflow: hidden;
	overflow-x: hidden;
	overflow-y: hidden;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
`;

export const KakaoPaymentSuccessContainer = styled.div`
	height: 100%;
	width: 100%;
	background-color: #f8f9fa;
`;
