import styled from "styled-components";

export const ListContiner = styled.div`
	padding: 0 16px;
	padding-top: 40px;
	padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : "24")}px;

	background-color: var(--gray-50);
`;

export const ListHeader = styled.div`
	margin-bottom: 24px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;
