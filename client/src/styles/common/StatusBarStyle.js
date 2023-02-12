import styled from "styled-components";
import { WhiteContainer } from "../container/ContainerStyle";

export const StatusBarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 72px;
	background-color: white;
	position: relative;
`;

export const LeftArrow = styled.img`
	cursor: pointer;
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

export const StatusBarPadding16Container = styled(StatusBarContainer)`
	padding-left: 16px;
	padding-right: 16px;
`;
