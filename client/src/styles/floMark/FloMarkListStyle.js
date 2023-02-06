import styled from "styled-components";

export const EmptyContianer = styled.div``;

export const FloMarkListContianer = styled.div`
	margin: 24px 16px;
	padding-bottom: 100px;
`;

export const ShadowCardContent = styled.div`
	display: flex;

	> div:first-child {
		display: flex;
		align-items: center;
	}

	img {
		width: 72px;
		height: 72px;

		margin-right: 16px;
	}
`;

export const TextContainer = styled.div`
	width: 100%;

	> div {
		margin-bottom: 8px;
	}

	> div:first-child {
		display: flex;
		justify-content: space-between;
	}

	> div:last-child {
		margin-bottom: 0px;
	}

	> div:last-child > div:nth-child(2) {
		margin: 0px 8px;
		color: var(--gray-400);
	}
`;

export const RowContainer = styled.div`
	display: flex;
`;
