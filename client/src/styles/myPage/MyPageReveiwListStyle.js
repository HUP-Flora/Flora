import styled from "styled-components";

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	> div {
		display: flex;
	}

	> div:first-child {
		margin-right: 16px;
	}

	> div:nth-child(2) > div:first-child {
		margin-right: 4px;
	}

	img {
		margin-left: 32px;
	}
`;

export const ShadowCardWrapper = styled.div`
	img {
		margin-left: 32px;
	}
`;
