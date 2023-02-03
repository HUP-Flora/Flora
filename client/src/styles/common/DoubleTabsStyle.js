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
	font-weight: bold;
	color: ${props => !props.active && "var(--gray-500)"};
	margin-bottom: 8px;
`;

export const TabHrWrapper = styled.hr`
	// display: flex;
`;

export const TabHr = styled.hr`
	height: 1px;
	border: none;
	background: ${props => (props.active ? "black" : "var(--gray-400)")};
`;
