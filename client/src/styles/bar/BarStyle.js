import styled from "styled-components";

export const WidthDoubleButtonToolBar = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const BorderTopButtonToolBar = styled.div`
	border-top: 0.1px solid var(--gray-300);
	background-color: white;
	width: 100%;
	position: fixed;
	bottom: 0px;
	padding: 16px;
`;

export const ButtonToolBar = styled.div`
	border: 1px solid white;
	background-color: white;
	width: calc(100% - 32px);
	position: fixed;
	bottom: 0px;
	padding-bottom: 16px;
`;

export const TabBarDiv = styled.div`
	display: flex;
	border-top: 0.1px solid var(--gray-300);
	background-color: white;
	width: 100%;
	position: fixed;
	bottom: 0px;
`;

export const TabMenu = styled.div`
	color: ${props => (props.isSelected ? "var(--primary-400)" : "var(--gray-500)")};
	text-align: center;
	font-size: 11px;
	width: 25%;
	height: 72px;
	position: relative;
`;

export const TabImg = styled.img`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const TabText = styled.div`
	position: absolute;
	top: 72%;
	left: 50%;
	transform: translate(-50%, -50%);
	white-space: nowrap;
	font-size: 11px;
`;

export const StatusBarDiv = styled.div`
	height: 40px;
	background-color: white;
	text-align: center;
	position: relative;
`;

export const StatusBarText = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 19px;
	font-weight: bold;
`;

export const LeftArrow = styled.img`
	position: absolute;
	top: 50%;
	left: 0%;
	transform: translate(0%, -50%);
`;
