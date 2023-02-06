import styled from "styled-components";

export const RcompleteContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 168px 16px 16px 16px;
`;

export const RcompleteTitle = styled.div`
	font-size: 28px;
	font-family: "NEXON Lv1 Gothic OTF";
	font-weight: bold;
	text-align: center;
`;

export const RcompleteContent = styled.div`
	font-size: 16px;
	font-family: "NEXON Lv1 Gothic OTF";
	text-align: center;
	margin-top: 24px;
  line-height: 24px;
`;

export const ShopInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 80px;
`;

export const ShopImage = styled.img`
	width: 184px;
	height: 184px;
	border-radius: 50%;
	margin-bottom: 16px;
`;

export const ShopName = styled.div`
	font-size: 19px;
	font-weight: bold;
`;

export const OrderInfoButton = styled.button`
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--primary-400);
	color: white;
	font-size: 16px;
	font-weight: bold;
	border: none;
	border-radius: 10px;
	position: fixed;
	bottom: 80px;
	width: calc(100% - 32px);
`;

export const HomeButton = styled(OrderInfoButton)`
	background: var(--primary-50);
	color: var(--primary-400);
	position: fixed;
	bottom: 16px;
	width: calc(100% - 32px);
`;
