import styled from "styled-components";

export const Primary50Button = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	// width: ${props => props.width || 168}px;
	width: 46.927%;
	height: ${props => props.isSmall || 44}px;

	background-color: var(--primary-50);
	color: var(--primary-400);

	border: none;
	border-radius: 10px;

	&:active {
		background-color: var(--primary-100);
	}
`;

export const Primary400Button = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	width: ${props => props.width || 168}px;
	height: ${props => (props.isSmall ? 32 : 44)}px;

	background-color: var(--primary-400);
	color: white;

	border: none;
	border-radius: 10px;

	font-weight: bold;
	font-size: 16px;

	&:active {
		background-color: var(--primary-500);
	}
`;

export const WhiteButton = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	// width: ${props => props.width || 168}px;
	width: 46.927%;
	height: ${props => (props.isSmall ? 32 : 44)}px;

	background-color: white;
	color: var(--primary-400);

	border: 1px solid var(--primary-400);
	border-radius: 10px;

	&:active {
		background-color: var(--primary-50);
	}
`;

export const Primary50LargeButton = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	// width: ${props => props.width || 168}px;
	width: 100%;
	height: 88px;

	background-color: var(--primary-50);
	color: var(--primary-400);

	border: none;
	border-radius: 10px;

	position: relative;

	&:active {
		background-color: var(--primary-100);
	}
`;

export const Primary400LargeButton = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	width: 100%;
	height: ${props => (props.isSmall ? 32 : 44)}px;

	background-color: var(--primary-400);
	color: white;

	border: none;
	border-radius: 10px;

	font-weight: bold;
	font-size: 16px;

	&:active {
		background-color: var(--primary-500);
	}
`;

export const YesOrNoButton = styled.button`
	width: 32px;
	height: 32px;
	border: 1px solid var(--green-400);
	border-radius: 10px;
	background-color: ${props => (props.isYes ? "var(--green-50)" : "var(--priamry-50)")};

	&:active {
		background-color: ${props => (props.isYes ? "var(--green-400)" : "var(--priamry-400)")};
	}
`;

export const KakaoLoginButton = styled.button`
	background-color: #ffe90d;
	width: 100%;
	height: 53px;

	border: none;
	border-radius: 10px;

	position: relative;

	font-weight: bold;
`;

export const KakaoPaymentButton = styled.button`
	width: 168px;
	height: 32px;
	border: none;
	border-radius: 5px;
	background-color: var(--primary-400);
	color: white;

	position: relative;
`;
