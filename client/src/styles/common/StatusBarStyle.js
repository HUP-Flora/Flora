import styled from "styled-components";

export const StatusBarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 72px;
	background-color: white;
	padding: 16px;
	position: relative;
`;

export const LeftArrow = styled.img`
`;

export const StatusBarText = styled.div`
	font-size: 19px;
	font-weight: bold;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;