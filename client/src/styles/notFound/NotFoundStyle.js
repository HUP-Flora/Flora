import styled from "styled-components";

export const NotFoundContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	
	& > p {
		font-size: 28px;
		font-weight: bold;
		text-align: center;
		margin: 16px 0;
	}
	
	& > button {
		height: 48px;
		margin: 16px 16px 0 16px;
		background: var(--primary-500);
		border: none;
		border-radius: 10px;
		color: white;
		font-weight: bold;
  }
`;