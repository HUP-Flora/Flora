import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	margin-bottom: 56px;
`;

export const ContentContainer = styled.div`
	padding-top: 40px;
	padding-bottom: 100px;

	// background-color: var(--primary-300);
	background: linear-gradient(0deg, #ff5da6 0%, rgba(255, 166, 208, 0.86) 100%);
	> img:nth-child(3) {
		width: 96px;

		left: 10px;
		bottom: 80px;
	}

	> img:nth-child(4) {
		width: 62px;
		top: 25px;
		right: 20px;
	}

	> img {
		position: absolute;
	}
`;

export const TextContainer = styled.div`
	color: #fff;

	text-align: center;

	letter-spacing: 1.5px;

	> div:last-child {
		margin-top: 24px;
		margin-bottom: 32px;
	}

	> div:last-child > div {
		justify-content: center;
		display: flex;

		margin-top: 16px;
	}
`;

export const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	> img {
		height: 80px;
	}
`;

export const SearchBarContainer = styled.div`
	position: absolute;
	bottom: -15px;

	width: 100%;

	padding: 0 24px;

	> div {
		color: #fff;
		margin-bottom: 8px;
	}

	> section {
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
		margin: 0px;
	}
`;
