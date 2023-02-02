import styled from "styled-components";
import { MyMessageTime } from "../MessageStyle";
import searchIcon from "../../../../../assets/chatting/SearchAdressImage.png";

export const FormWrapper = styled.div`
	background: #ffffff;
	margin-left: 16px;
	margin-bottom: 0;
	border-radius: 10px;
	width: 232px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const FormHeaderContainer = styled.div`
	font-size: 19px;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px 0;
	background: #ffeaf5;
	border-radius: 10px 10px 0 0;
`;

export const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 24px 16px 16px 16px;
`;

export const InputLabel = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 8px;
`;

export const TextInput = styled.input`
	font-size: 16px;
	border: none;
	padding-bottom: 8px;
	border-bottom: ${props => (props.HasError ? "1px solid red" : "1px solid #ADB5BD")};
	&::placeholder {
		color: #adb5bd;
	}
	&:focus {
		outline: none;
		border-bottom: ${props => (props.HasError ? "1px solid red" : "1px solid black")};
	}
	// 보여주기만 하는 상황
	&:disabled {
		border: none;
		background: #ffffff;
		color: black;
		margin-bottom: 16px;
	}
`;

export const InputCounter = styled.p`
	font-size: 11px;
	color: #adb5bd;
	margin: 0 0 8px auto;
`;

export const MarginBottom16TextInput = styled(TextInput)`
	margin-bottom: ${props => (props.HasError ? "0" : "16px")};
`;

export const MarginBottom8TextInput = styled(TextInput)`
	margin-bottom: 8px;
`;

export const GiftMessageInput = styled.textarea`
	font-size: 16px;
	border: 1px solid #adb5bd;
	border-radius: 5px;
	resize: none;
	padding: 12px;
	width: 200px;
	height: 144px;
	&::placeholder {
		color: #adb5bd;
	}
	&:focus {
		outline: none;
	}
	&:disabled {
		background: #ffffff;
		color: black;
		margin-bottom: 16px;
	}
`;

export const SubmitPaymentButton = styled.button`
	font-weight: bold;
	width: 168px;
	height: 30px;
	background: #ff349c;
	border: none;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 24px auto 0 auto;
	color: white;
`;

export const InputCounterContainer = styled.div`
	display: flex;
`;

export const ErrorMessage = styled.p`
	color: red;
	font-size: 11px;
	margin: 0 0 8px 0;
`;

export const FormFooter = styled.div`
	background: #ffeaf5;
	padding: 16px;
`;

export const FormFooterMessageContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const FormFooterMessage = styled.p`
	font-weight: bold;
	color: black;
	margin: 0;
`;

export const FormTime = styled(MyMessageTime)`
	margin: 4px auto 13px 16px;
`;

export const SearchAddressInput = styled(MarginBottom8TextInput)`
	&:disabled {
		background-image: url(${searchIcon});
		background-repeat: no-repeat;
		background-size: 24px;
		background-position: 95% 0;
		border-bottom: 1px solid #adb5bd;
		cursor: pointer;
		border-bottom: ${props => (props.HasError ? "1px solid red" : "1px solid #ADB5BD")};
		margin-bottom: ${props => (props.HasError ? "0" : "16px")};
	}
`;

export const SearchAddressContainerButton = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;

export const CheckAddress = styled.p`
	color: black;
	margin: 0 0 16px 0;
`;
