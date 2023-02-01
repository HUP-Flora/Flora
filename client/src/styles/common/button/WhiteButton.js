import styled from "styled-components";

export const WhiteButton = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	// width: ${props => props.width || 168}px;
	width: 46.927%;
	height: 44px;

	background-color: white;
	color: var(--primary-400);

	border: 1px solid var(--primary-400);
	border-radius: 10px;
`;
