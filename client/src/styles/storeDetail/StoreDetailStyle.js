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
