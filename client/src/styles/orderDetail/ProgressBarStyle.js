import styled, { keyframes } from "styled-components";

export const OrderStatusContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
`;

export const OrderStatusText = styled.p`
	font-family: "NEXON Lv1 Gothic OTF";
	font-size: 13px;
	color: ${props => (props.isNow ? "black" : "var(--gray-500)")};
	font-weight: ${props => (props.isNow ? "bold" : "normal")};
`;

export const OrderStatusLine = styled.div`
	width: 100%;
	height: 16px;
	background-color: var(--gray-100);
	border: none;
	border-radius: 10px;
	position: relative;
	z-index: 1;
	margin-bottom: 48px;
`;

export const LeftToRight = keyframes`
	from {
		width: 0%;
  }
	to {
		width: ${props => props.width || "0"};
  }
`;

export const OrderStatusLineNow = styled.div`
	position: absolute;
	width: ${props => props.width || "0"};
	height: 100%;
	background-color: var(--primary-400);
	border-radius: 10px;
	transition: all 0.5s ease-in-out;
	animation: ${LeftToRight} 1s ease-in-out;
	z-index: 2;
`;

export const StatusChageButton = styled.button`
	width: 51px;
	height: 21px;
	margin-bottom: 8px;
	background: var(--primary-50);
	border: none;
	border-radius: 10px;
	color: var(--primary-400);
	font-size: 11px;
	font-weight: bold;
	padding: 5px;
	position: relative;
	left: ${props => props.left};
`;
