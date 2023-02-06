import styled from "styled-components";

export const HeaderConianer = styled.div`
	margin: 56px 24px;

	> div {
		display: flex;
		justify-content: ${props => props.type === "owner" && "space-between"};
		align-items: center;
	}

	> div:nth-child(2) {
		margin-top: 16px;
	}

	& img {
		width: ${props => (props.type === "customer" ? "16px" : "88px")};
		height: ${props => (props.type === "customer" ? "auto" : "88px")};

		margin-left: ${props => props.type === "customer" && 16}px;

		border-radius: ${props => props.type === "owner" && "50%"};
	}
`;

export const EditContainer = styled.div`
	display: flex;

	> input {
		margin-right: 8px;
	}
`;

export const ValidTextWrapper = styled.div`
	margin-top: 0px !important;
	margin-bottom: 16px;
`;
