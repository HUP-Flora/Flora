import styled from "styled-components";

export const NextButtonContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 10px;
	background: var(--primary-400);
	width: calc(100% - 32px);
	height: 44px;
	color: #ffffff;
	font-size: 16px;
	font-weight: bold;
	position: ${props => props.isNotFixed ? "relative" : "fixed"};
	bottom: 16px;
	left: 16px;
`;