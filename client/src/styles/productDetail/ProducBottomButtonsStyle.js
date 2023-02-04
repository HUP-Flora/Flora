import styled from "styled-components";

export const ButtonsContainer = styled.div`
	padding: 0 16px;
	display: flex;
	justify-content: space-between;
	background-color: #fff;

	position: fixed;
	z-index: 1000;
	bottom: 0;
	left: 0;
	right: 0;

	border-top: 0.5px solid var(--gray-300);

	> button {
		width: 100%;
		margin: 16px 0;
	}

	> button:first-child {
		margin-right: 8px;
	}

	> button:last-child {
		margin-left: 8px;
	}
`;
