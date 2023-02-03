import styled, { css } from "styled-components";

export const StoreInfoContainer = styled.div`
	margin-top: 24px;
	margin-bottom: 40px;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;

	margin: 0 24px;
`;

export const OnOffToggle = styled.div`
	width: 65px;

	border-radius: 20px;

	background-color: ${props => (props.isOn ? "var(--gray-300)" : "var(--primary-50)")};

	transition: all 0.2s ease-in-out;

	> div {
		width: fit-content;
		height: 100%;

		display: flex;
		padding: 0px 13px;
		align-items: center;

		font-size: 13px;

		border-radius: 20px;

		${props =>
			props.isOn &&
			css`
				transform: translate(0px, 0);
				transition: all 0.2s ease-in-out;
			`}

		${props =>
			!props.isOn &&
			css`
				transform: translate(15px, 0);
				transition: all 0.2s ease-in-out;
			`}
	}
`;

export const ToggleCircle = styled.div`
	width: fit-content;

	padding: 5px 10px;

	border-radius: 10px;
	background-color: pink;
`;

export const InfoContainer = styled.div`
	display: flex;

	margin: 0 24px;
	margin-top: 32px;
	margin-bottom: 24px;
`;

export const ImageWrapper = styled.div`
	margin-right: 30px;
`;

export const Image = styled.img`
	border-radius: 50%;

	width: 80px;
	height: 80px;
`;

export const Description = styled.div`
	font-size: 13px;
	display: flex;
	align-items: center;
`;

export const BasicInfoContainer = styled.div`
	margin: 0 24px;
	margin-top: 24px;

	> div:first-child {
		margin-bottom: 8px;
	}
`;

export const BasicInfoRow = styled.div`
	display: flex;

	> div:first-child {
		width: calc(50% - 16px);
		margin-right: 16px;
	}
`;
