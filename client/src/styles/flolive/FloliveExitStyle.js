import styled from "styled-components";

export const Container = styled.div`
	height: calc(100vh - 80px);
	display: flex;

	div {
		text-align-last: center;
	}

	> div {
		margin: auto;
	}

	> div > div:first-child {
		margin-bottom: 80px;
	}

	img {
		width: 50%;
		border-radius: 50%;
		margin-bottom: 16px;
	}
`;
