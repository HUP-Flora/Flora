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
	cursor: pointer;
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

export const Primary50SmallButton = styled(Primary50Button)`
	font-size: 11px;
	height: fit-content;
	width: fit-content;
	padding: 4px 12px;
	border-radius: 3px;
`;

export const Primary400SmallButton = styled(Primary400Button)`
	font-size: 11px;
	height: fit-content;
	width: fit-content;
	padding: 4px 12px;
	border-radius: 3px;
`;

export const WhiteSmallButton = styled(WhiteButton)`
	font-size: 11px;
	height: fit-content;
	width: fit-content;
	padding: 4px 12px;
	border-radius: 3px;
`;

export const GraySmallButton = styled(WhiteButton)`
	font-size: 11px;
	height: fit-content;
	width: fit-content;
	padding: 4px 12px;
	border-radius: 3px;
	border: none;

	background-color: var(--gray-100);
	color: var(--gray-500);

	&:active {
		background-color: var(--gray-300);
	}
`;

export const Primary400CheckButton = styled.div`
	width: 30px;
	height: 30px;

	margin-right: ${props => props.marginRight && props.marginRight}px;

	appearance: none;
	border-radius: 5px;

	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");

	background-size: 100% 100%;
	background-position: 50%;
	background-repeat: no-repeat;
	background-color: var(--primary-400);

	&:active {
		background-color: var(--primary-500);
	}
`;

export const Primary50CancelButton = styled.div`
	width: 30px;
	height: 30px;

	margin-right: ${props => props.marginRight && props.marginRight}px;

	appearance: none;
	border-radius: 5px;
	border: 1.5px solid var(--primary-400);

	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-x' width='30' height='30' viewBox='0 0 24 24' stroke-width='3' stroke='%23ff349c' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cline x1='18' y1='6' x2='6' y2='18' /%3E%3Cline x1='6' y1='6' x2='18' y2='18' /%3E%3C/svg%3E");
	background-size: 80% 80%;
	background-position: 50%;
	background-repeat: no-repeat;
	background-color: var(--primary-50);

	&:active {
		background-color: var(--primary-100);
	}
`;
