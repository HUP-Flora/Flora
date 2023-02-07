import styled from "styled-components";

export const ExitInfoContainer = styled.div`
	padding: 16px 24px;
	margin-bottom: 24px;

	border-radius: 10px;

	background-color: var(--gray-100);
	color: var(--gray-500);

	> div {
		display: flex;
		font-size: 13px;
	}

	> div:first-child {
		margin-bottom: 4px;
	}

	img {
		width: 16px;
		height: 13.83px;

		margin-right: 4px;
	}
`;
