import styled from "styled-components";

export const OrderDetailContainer = styled.div`
	padding: 0 16px;
	margin-top: 32px;
`;

export const OrderDetailHeaderTitle = styled.div`
	font-family: "NEXON Lv1 Gothic OTF";
	font-size: 28px;
	font-weight: bold;
	line-height: 36px;
	margin-bottom: 24px;
`;

export const OrderDetailHeaderSubTitle = styled.div`
	font-family: "NEXON Lv1 Gothic OTF";
	font-size: 13px;
	color: var(--gray-500);
	line-height: 18px;
	margin-bottom: ${props => props.status ? "0" : "32px"};
`;

export const ReportContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 19px;
	margin-bottom: 48px;
	& > img {
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}
	& > p {
		font-family: "NEXON Lv1 Gothic OTF";
		font-size: 13px;
		color: red;
		text-decoration: underline;
	}
`;

export const OrderDetailContentContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 8px;
`;

export const FlowerImage = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 15px;
	margin-left: calc(50% - 60px); // 가운데 정렬
	margin-bottom: 56px;
`;

export const OrderDetailTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 32px;

	& > p {
		font-size: 19px;
		font-weight: bold;
	}
`;

export const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;

	& > p {
		margin: 0 4px;
		font-size: 13px;
	}

	& > p:nth-child(2),
	p:nth-child(3) {
		color: var(--gray-500);
	}
`;

export const MB16FlexBox = styled(FlexBox)`
	margin-bottom: 16px;

	& > p {
		font-size: 16px;
	}

	& > p:nth-child(1) {
		font-weight: bold;
	}

	& > p:nth-child(2) {
		color: black;
	}
`;

export const MB24FlexBox = styled(MB16FlexBox)`
	margin-bottom: 24px;
`;

export const MB24BorderFlexBox = styled(MB24FlexBox)`
	margin: 0;
	padding-bottom: 24px;
	border-bottom: 1px solid var(--gray-400);
`;

export const FooterBox = styled(MB24FlexBox)`
	margin: 24px 0;
	
	& > p {
		font-weight: bold;
	}
`;

export const RepaymentButton = styled.button`
	width: 100%;
	height: 44px;
	border: none;
	border-radius: 10px;
	background-color: var(--primary-400);
	color: white;
	font-weight: bold;
	margin-top: 24px;
`;
