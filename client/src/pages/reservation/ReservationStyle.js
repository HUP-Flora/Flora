import styled from "styled-components";

export const ReserVationTypeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 16px 16px 16px;
`;

export const ReservationTypeTitle = styled.div`
	font-size: 28px;
	font-family: "NEXON Lv1 Gothic OTF";
	font-weight: bold;
	margin-top: 96px;
	margin-bottom: 24px;
`;

export const ReservationTypeContent = styled.p`
	font-family: "NEXON Lv1 Gothic OTF";
	font-size: 16px;
	color: var(--gray-500);
`;

export const DeliveryButton = styled.button`
	width: 100%;
	height: 94px;
	background: #ffffff;
	border: ${props => props.isClick ? "1px solid var(--primary-400)" : "1px solid var(--gray-500)"};
	border-radius: 10px;
	margin-top: 128px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonImage = styled.img`
	width: 30px;
	height: 30px;
	margin-right: 16px;
`;

export const GrayText = styled.p`
	color: ${props => props.isClick ? "var(--primary-400)" : "var(--gray-500)" };
	font-size: 19px;
`;

export const PickUpButton = styled(DeliveryButton)`
	margin-top: 32px;
`;

export const DateContainer = styled.div`
  padding: 0 16px
`;


