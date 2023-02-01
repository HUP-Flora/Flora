import styled from "styled-components";

export const Primary400Button = styled.button`
	margin-top: ${props => props.top || 0}px;
	margin-bottom: ${props => props.bottom || 0}px;
	margin-left: ${props => props.left || 0}px;
	margin-right: ${props => props.right || 0}px;

	width: ${props => props.width || 168}px;
	height: 44px;

	background-color: var(--primary-400);
	color: white;

	border-radius: 10px;

	font-weight: bold;
	font-size: 16px;
`;
