import styled from "styled-components";

export const StoreCardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: white;
	margin-bottom: 16px;
	border-radius: 10px;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
`;

export const StoreCardTextSection = styled.section`
	width: calc(100% - 100px);
	// height: 96px;
	padding-bottom: 16px;
`;

export const StoreCardImageSection = styled.section`
	width: 100px;
	height: 100%;
	position: relative;
	padding: 16px;
`;

export const StoreCardImage = styled.img`
	width: 68px;
	height: 68px;
	border-radius: 5px;
`;

export const StoreCardTextTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const StoreCardTextTitleSection = styled.div`
	display: flex;
	align-items: center;
`;

export const StoreCardTextFloMarkSection = styled.div`
	display: flex;
	align-items: center;
`;

export const StoreCardTextContent = styled.div`
	padding-left: 16px;
	padding-right: 16px;
`;

export const StoreCardTextContentAddress = styled.div`
	display: flex;
	padding-bottom: 8px;
`;

export const StoreCardTextContentPhoneAndWorkingTime = styled.div`
	display: flex;
`;
