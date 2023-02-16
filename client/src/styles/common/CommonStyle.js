import styled, { css } from "styled-components";
import { ErrorMessage } from "../chatting/Messages/Message/forms/OtherFormStyle";

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
	color: ${props => props.color && props.color};
	};
`;

export const GrayText = styled.div`
	padding-top: ${props => props.top || 0}px;
	padding-bottom: ${props => props.bottom || 0}px;
	padding-left: ${props => props.left || 0}px;
	padding-right: ${props => props.right || 0}px;
	font-size: ${props => props.size || 16}px;
	font-weight: ${props => props.weight || "normal"};
	font-family: ${props => (props.font === "nexon" ? "NEXON Lv1 Gothic OTF" : "Pretendard-Regular")};
	color: var(--gray-500);
`;

export const PointerText = styled(GrayText)`
	cursor: pointer;
	font-weight: ${props => (props.isBold ? "bold" : "transparent")};
	color: ${props =>
		props.color === "primary"
			? "var(--primary-500)"
			: props.color === "gray"
			? "var(--gray-500)"
			: "black"};
`;

export const ValidText = styled.div`
	margin-top: 4px;
	color: red;
	font-weight: normal;
	font-size: 13px;
`;

export const OnOffToggle = styled.div`
	width: 65px;

	border-radius: 20px;

	background-color: ${props => (props.isOn ? "var(--gray-300)" : "var(--primary-50)")};

	transition: all 0.2s ease-in-out;

	cursor: pointer;

	> div {
		width: fit-content;
		height: 100%;

		display: flex;
		padding: 0px 13px;
		align-items: center;

		font-size: 13px;

		border-radius: 20px;

		${props =>
			props.isOn &&
			css`
				transform: translate(0px, 0);
				transition: all 0.2s ease-in-out;
			`}

		${props =>
			!props.isOn &&
			css`
				transform: translate(15px, 0);
				transition: all 0.2s ease-in-out;
			`}
	}
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
	border-radius: 50px;

	position: relative;
`;

export const PictureSection = styled.div`
	cursor: pointer;
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
	cursor: pointer;
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

export const WhiteLayout = styled.div`
	height: auto;
	padding-left: 16px;
	padding-right: 16px;
`;

export const VerticalLine = styled.hr`
		border: 1px solid var(--gray-500)
		width: 1;
		height: 40%;
	`;

export const GrayHr = styled.hr`
	background-color: var(--gray-300);
	height: 0.5px;
	border: 0;
	margin: 0 16px;
`;

export const BottomButtonContainer = styled.div`
	padding: 0 16px;

	position: fixed;
	display: flex;
	justify-content: space-between;

	background-color: #fff;
	border-top: 0.5px solid var(--gray-300);

	z-index: 30;

	bottom: 0;
	left: 0;
	right: 0;

	> button {
		width: 100%;
		margin: 16px 0;
	}
`;

// 한 행에 버튼 두 개
export const BottomRowDoubleButtonContainer = styled(BottomButtonContainer)`
	> button:first-child {
		margin-right: 8px;
	}

	> button:last-child {
		margin-left: 8px;
	}
`;

// 한 행에 버튼 한 개
export const BottomDoubleButtonContainer = styled(BottomButtonContainer)`
	display: block;

	> button:first-child {
		margin-bottom: 8px;
	}

	> button:last-child {
		margin-top: 8px;
	}
`;

export const ShadowCard = styled.div`
	padding: ${props => (props.padding ? props.padding : "16")}px;
	margin-bottom: ${props => props.marginBottom && props.marginBottom}px;

	display: ${props => props.display && props.display};
	justify-content: ${props => props.isSpaceBetween && "space-between"};

	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
	border-radius: 10px;

	img {
		border-radius: 50%;
	}
`;

export const PointerShadowCard = styled(ShadowCard)`
	cursor: pointer;
`;

export const Primary400CheckBox = styled.input`
	width: 20px;
	height: 20px;

	margin-right: 8px;

	appearance: none;
	border: 1px solid var(--primary-400);
	border-radius: 5px;

	&:checked {
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: var(--primary-400);
	}
`;

export const EmptyContainer = styled.div`
	width: 100% !important;
	
	// Status Bar + Bottom Menu Bar가 있다면 height를 제외하여 중앙에 위치 
	// Status Bar(72) + Bottom Menu Bar(72) = 144px
	height: ${props => props.isFull === true && "calc(100vh - " + props.exceptHeight + "px)"};
	// height: calc(100vh - ${props => props.exceptHeight && props.exceptHeight}px);

	margin-right: 0 !important;
	
    display: flex;
    align-items: center;
    justify-content: center;s
	
	text-align: center;

	color: var(--gray-500);
	font-size: ${props => props.isFull && "19px"};
	font-weight: ${props => props.isFull && "bold"};
`;

export const BottomBorderInput = styled.input`
	width: ${props => (props.width ? props.width : 100)}%;

	padding: 8px;

	border: none;
	border-bottom: 1px solid var(--gray-500);

	::placeholder {
		color: var(--gray-500);
	}

	&:focus {
		outline: none;

		border: none;
		border-bottom: 1.5px solid black;
	}
`;

export const MyPageBottomBorderNameInput = styled(BottomBorderInput)`
	font-size: 19px;
`;

export const MyPageBottomBorderInput = styled(BottomBorderInput)`
	padding: 0px;
	margin-top: 16px;
	margin-left: 8px;
`;

// export const EmptyContainer = styled.div`
// 	width: 100% !important;
// 	height: 200px;

// 	margin-right: 0 !important;

// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;

export const PaddingLeft16BoldText = styled(BoldText)`
	padding-left: 16px;
`;

export const InputDiv = styled.div`
	margin-top: 24px;
	width: 100%;
	position: relative;
`;

export const SearchInput = styled(BottomBorderInput)``;

export const AddressList = styled.div`
	width: 100%;
	height: 75%;
	overflow-y: auto;
	padding-top: 16px;

	position: relative;
`;

export const EmptyAddressList = styled.div`
	color: black;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
`;

export const PaddingX16 = styled.div`
	padding-left: 16px;
	padding-right: 16px;
`;

export const BodyFrame = styled.div`
	height: calc(100% - 40px);
`;

export const KakaoPaymentButtonSection = styled.div`
	text-align: center;
	margin-top: ${props => (props.isPayment ? "16" : "0")}px;
`;

export const NoShowPTag = styled.p`
	cursor: pointer;
`;
