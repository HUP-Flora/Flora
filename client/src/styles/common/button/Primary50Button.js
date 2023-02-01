import styled from "styled-components";

export const Primary50Button = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	// width: ${props => props.width || 168}px;
	width: 46.927%;
	height: 44px;

	background-color: var(--primary-50);
	color: var(--primary-400);

	border: none;
	border-radius: 10px;
`;
