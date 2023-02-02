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
	height: ${props => props.height || 0}px;
`;

export const Text = styled.div`
	padding-top: ${props => props.top || 0}px;
	padding-bottom: ${props => props.bottom || 0}px;
	padding-left: ${props => props.left || 0}px;
	padding-right: ${props => props.right || 0}px;
	font-size: ${props => props.size || 16}px;
	font-family: ${props => (props.font === "nexon" ? "NEXON Lv1 Gothic OTF" : "Pretendard-Regular")};
`;

export const BoldText = styled.div`
	padding-top: ${props => props.top || 0}px;
	padding-bottom: ${props => props.bottom || 0}px;
	padding-left: ${props => props.left || 0}px;
	padding-right: ${props => props.right || 0}px;
	font-weight: bold;
	font-size: ${props => props.size || 16}px;
	font-family: ${props => (props.font === "nexon" ? "NEXON Lv1 Gothic OTF" : "Pretendard-Regular")};
`;

export const GrayText = styled.div`
	padding-top: ${props => props.top || 0}px;
	padding-bottom: ${props => props.bottom || 0}px;
	padding-left: ${props => props.left || 0}px;
	padding-right: ${props => props.right || 0}px;
	font-size: ${props => props.size || 16}px;
	font-family: ${props => (props.font === "nexon" ? "NEXON Lv1 Gothic OTF" : "Pretendard-Regular")};
	color: var(--gray-500);
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

export const LargeButtonIcon = styled.img`
	position: absolute;
	top: 50%;
	left: 33%;
	transform: translate(-50%, -50%);
`;

export const LargeButtonText = styled.div`
	position: absolute;
	top: 50%;
	left: 57%;
	transform: translate(-50%, -50%);
	font-size: 19px;
`;

export const UploadPictureSection = styled.div`
	height: 100px;
	display: flex;
	justify-content: center;
	position: relative;
`;

export const PicturePreview = styled.img`
	width: 100px;
	height: 100px;
	border: 1px solid var(--gray-400);
	border-radius: 50px;

	position: relative;
`;

export const PictureSection = styled.div`
	width: 100px;
	height: 100px;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const EmptyPictureImg = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const UploadButton = styled.img`
	position: absolute;
	top: 80%;
	left: 90%;
	transform: translate(-50%, -50%);
	width: 40px;
	height: 40px;
`;

export const ChooseWorkingTimeSection = styled.div`
	margin-left: 8px;
	margin-right: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ChooseHolidaySection = styled.div`
	margin-left: 15px;
	margin-right: 15px;
	position: relative;
	display: flex;
	justify-content: space-between;
`;

export const HolidayCircle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 20px;
	border: 1px solid ${props => (props.isClicked ? "var(--primary-400)" : "var(--gray-100)")};
	background-color: ${props => (props.isClicked ? "var(--primary-50)" : "var(--gray-100)")};
	color: ${props => (props.isClicked ? "var(--primary-400)" : "black")};

	position: relative;
`;

export const HolidayCircleText = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const TimeSelect = styled.select`
	overflow-y: auto;
`;

export const TimeOption = styled.option`
	// width: 50px;
	// height: 40px;
	overflow-y: scroll;
`;

export const ImageInput = styled.input`
	display: none;
`;
