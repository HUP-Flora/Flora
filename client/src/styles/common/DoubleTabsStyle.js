import styled from "styled-components";

export const TabTitlesContainer = styled.div`
	display: flex;

	> div {
		width: 50%;

		text-align: center;

		cursor: pointer;
	}
`;

export const TabTitle = styled.div`
	padding-bottom: 8px;

	border-bottom: 1px solid ${props => (props.active ? "black" : "var(--gray-400)")};

	font-weight: bold;
	color: ${props => !props.active && "var(--gray-500)"};
`;
