import styled from "styled-components";

export const Container = styled.div`
	position: relative;
`;

export const ContentContainer = styled.div`
	padding-top: 40px;
	padding-bottom: 100px;

	background-color: var(--primary-300);
	border-radius: 0 0 15px 15px;

	> img:nth-child(3) {
		width: 96px;

		left: 20px;
		bottom: 70px;
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
		height: 36px;
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
`;
