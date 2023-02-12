import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;

	margin: 0 24px;

	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
`;

export const ContentContainer = styled.div`
	width: 100%;
	height: calc(100vh - 70px);

	> div {
		width: 100%;
	}

	> div:first-child > img {
		width: auto;
		height: 60px;

		margin-top: 64px;
		margin-bottom: 24px;
	}

	p {
		font-weight: bold;
		font-size: 33px;
	}
`;

export const TextContainer = styled.div`
	div {
		margin-bottom: 16px;
	}

	> div:last-child {
		display: flex;
	}
`;

export const MainImgWrapper = styled.div`
	display: flex;
	justify-content: center;

	> img {
		width: 70%;
	}
`;
