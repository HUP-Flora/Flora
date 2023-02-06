import styled from "styled-components";

export const DeleteInfoContainer = styled.div`
	margin: 64px 16px;
	padding-bottom: 120px;

	> div:first-child {
		line-height: 200%;
	}

	> div:nth-child(3) {
		display: flex;
		align-items: center;
	}
`;

export const DetailInfoWrapper = styled.div`
	padding: 32px 16px;
	margin-top: 64px;
	margin-bottom: 40px;

	background-color: var(--gray-50);

	> div:first-child {
		margin-bottom: 16px;
	}

	> ul {
		padding-left: 16px;
	}

	li {
		padding-left: -5px;
		list-style: disc;
	}

	li:first-child {
		margin-bottom: 16px;
	}
`;

export const ValidTextWrapper = styled.div`
	margin-left: 32px;
`;
