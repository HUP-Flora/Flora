import styled from "styled-components";

export const MyMessageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 8px;
	margin-right: 16px;
`;

export const MessageTime = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MessageBox = styled.div`
	background: #ffffff;
	border-radius: 10px;
	padding: 10px 16px 10px 16px;
	max-width: 100%;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const MessageText = styled.p`
	font-size: 16px;
	color: #000000;
	margin: 0;
`;

export const MyMessageTime = styled.p`
	font-size: 13px;
	color: #adb5bd;
	margin: 8px 0 0 auto;
`;

export const YourMessageContainer = styled(MyMessageContainer)`
	justify-content: flex-start;
	margin-left: 16px;
`;

export const YourMessageTime = styled(MyMessageTime)`
	margin: 8px auto 0 0;
`;
