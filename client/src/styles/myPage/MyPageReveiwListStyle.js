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
	position: relative;

	// ::after {
	// 	display: block;
	// 	content: "";
	// 	padding-bottom: 100%;
	// }

	img {
		width: 80px;
		height: 80px;
		margin-left: 32px;

		object-fit: cover;
		border-radius: 50%;
	}
`;
