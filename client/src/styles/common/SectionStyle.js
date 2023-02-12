import styled from "styled-components";

export const SignupTitleSection = styled.section`
	height: ${props => props.height || 0}px;
	margin-top: ${props => props.top || 0}px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const SignupContentSection = styled.section`
	height: ${props => props.height || 0}px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const SignupButtonSection = styled.section`
	width: 100%;
	padding-top: 16px;
	padding-bottom: 16px;

	background-color: white;
`;

export const PaymentSuccessButtonSection = styled.section`
	width: 100%;
	padding: 16px;

	background-color: white;
`;
