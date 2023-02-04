import styled from "styled-components";

export const ButtonsContainer = styled.div`
	display: ${props => (props.isCustomer ? "flex" : "block")};

	margin: 0 16px;
	margin-bottom: 40px;

	& button {
		width: 100%;
	}

	& button:first-child {
		margin-bottom: ${props => !props.isCustomer && "16px"};
	}
`;

export const FloLiveButtonContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;

	> button {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	& img {
		height: 20px;
		margin-right: 8px;
	}
`;

export const FlorMarkWrapper = styled.div`
	width: fit-content;

	margin-right: 8px;
	padding: 4px 8px;
	text-align: center;

	color: ${props => (props.isFloMarkClicked ? "var(--primary-400)" : "var(--gray-500)")};
	// background-color: ${props => props.isFloMarkClicked && "var(--primary-50)"};

	border: 1px solid ${props => (props.isFloMarkClicked ? "var(--primary-400)" : "var(--gray-500)")};
	border-radius: 5px;

	cursor: pointer;

	> img {
		height: 22px;
	}

	> div {
		font-size: 11px;
	}
`;
