import styled from "styled-components";

export const Header = styled.div`
	margin: 0 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div {
		display: flex;
	}

	> div > div {
		margin-right: 8px;
	}

	button {
		border-radius: 10px;
		font-size: 13px;
		padding: 4px 16px;
	}
`;

export const ContentContainer = styled.div`
	margin: 0 8px;
	display: flex;

	> img {
		width: 80px;
		height: 80px;

		margin-right: 32px;
	}

	> div {
		display: flex;
		flex-direction: column;
		align-content: unset;
		justify-content: space-evenly;
	}

	> div > div {
		margin-bottom: 8px;
	}
`;

export const GrayHrWrapper = styled.div`
	margin-top: 8px;
	margin-bottom: 24px;

	> hr {
		margin: 0;
	}
`;

export const OwnerButtonsContainer = styled.div`
	margin: 0 8px;
	margin-top: 24px;

	display: flex;
	justify-content: center;

	> button {
		width: 100%;

		padding: 8px 24px;

		font-size: 13px;
		border-radius: 10px;
	}

	> button:first-child {
		margin-right: 16px;
	}

	> button:last-child {
		margin-left: 16px;
	}
`;
