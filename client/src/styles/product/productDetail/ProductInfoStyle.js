import styled from "styled-components";

export const ImageWrapper = styled.div`
	margin: 0 24px;
	margin-bottom: 40px;

	position: relative;
	// width: 100%;

	::after {
		display: block;
		content: "";
		padding-bottom: 100%;
	}

	> img {
		border-radius: 16px;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Header = styled.div`
	margin: 0 24px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const HrWrapper = styled.div`
	margin: 32px 0;
`;

export const DescriptionWrapper = styled.div`
	margin: 0 24px;
	margin-bottom: 40px;
	white-space: pre-wrap;

	// bottom buttons padding 포함
	padding-bottom: 116px;
`;
