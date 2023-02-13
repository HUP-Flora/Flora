import styled from "styled-components";

export const ProductsContainer = styled.div`
	margin: 0 16px;
	margin-top: 40px;

	display: flex;

	flex-wrap: wrap;

	> div:nth-child(odd) {
		margin-right: 8px;
		width: calc(50% - 8px);
	}

	> div:nth-child(even) {
		margin-left: 8px;
		width: calc(50% - 8px);
	}
`;

export const ProductContainer = styled.div`
	margin-bottom: 32px;
	display: block;
`;

export const ProductImageWrapper = styled.div`
	cursor: pointer;
	position: relative;

	&::after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	> img {
		width: 100%;
		height: 100%;

		position: absolute;

		top: 0;
		left: 0;

		object-fit: cover;
		border-radius: 15px;
	}
`;

export const ProductName = styled.div`
	margin-top: 16px;
	margin-bottom: 4px;

	font-size: 16px;
	font-weight: bold;
`;

export const ProductPrice = styled.div`
	font-size: 13px;
	color: var(--gray-500);
`;
