import styled from "styled-components";

// 미디어쿼리로 pc일 경우와 mobile일 경우를 구분해서 진행하면 될 듯!

export const AppContainer = styled.div`
	margin: 0px;
	padding: 0px;
	width: 100vw;
	// height: 100vh;
	font-size: 16px;
`;

export const BlankSection = styled.div`
	height: ${props => props.height || 0};
`;

export const BoldText = styled.div`
	font-weight: bold;
	font-size: ${props => props.size || 16}px;
`;

export const ButtonToolBar = styled.div`
	border-top: 0.1px solid var(--gray-300);
	background-color: white;
	width: calc(100% - 32px);
	position: fixed;
	bottom: 0px;
	padding: 16px;
`;

export const OnOff = styled.div`
	width: 40px;
	height: 20px;
	line-height: 20px;
	border-radius: 10px;

	text-align: center;
	font-size: 11px;

	color: white;
	background-color: ${props => (props.isOn ? "#F03E3E" : "var(--gray-400)")};
	filter: ${props =>
		props.isOn
			? "drop-shadow(0px 0px 5px rgba(240, 62, 62, 0.5))"
			: "drop-shadow(0px 0px 5px #CED4DA)"};
`;

export const KakaoLogo = styled.img`
	position: absolute;
	top: 50%;
	left: 10%;
	transform: translate(-50%, -50%);
`;

export const KakaoPayLogo = styled.img`
	position: absolute;
	top: 50%;
	left: 20%;
	transform: translate(-50%, -50%);
`;

export const KakaoPayText = styled.div`
	white-space: nowrap;
	position: absolute;
	top: 50%;
	left: 63%;
	transform: translate(-50%, -50%);
`;
