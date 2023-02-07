import styled from "styled-components";

export const Container = styled.div`
	> div:first-child {
		padding: 46px 16px;
		margin-top: -250px;
		margin-left: -135px;
	}

	> div:first-child div:first-child {
		justify-content: space-around;
	}

	> div:first-child > div:last-child {
		display: flex;
		margin-top: 40px;
		justify-content: center;
	}
`;

export const FlexBox = styled.div`
	height: 60px;

	margin-bottom: 40px;

	display: flex;
	align-items: center;
	justify-content: center;

	> div:first-child > div > img:first-child {
		width: 60px;
		height: 60px;
	}

	> div:first-child > div > img:last-child {
		width: 20px;
		height: 20px;
	}

	> div:first-child > div {
		width: 60px;
		height: 60px;

		transform: translate(0%, -50%);
	}

	> div:first-child > div > div:first-child {
		margin-right: 40px;
	}
`;
