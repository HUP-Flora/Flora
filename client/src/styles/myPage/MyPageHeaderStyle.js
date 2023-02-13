import styled from "styled-components";

export const HeaderConianer = styled.div`
	margin: 56px 24px;

	> div {
		display: flex;
		justify-content: space-between;
		// justify-content: ${props => props.type === "STORE" && "space-between"};
		align-items: center;
	}

	> div:nth-child(2) {
		margin-top: 16px;
	}

	& img {
		width: ${props => (props.type === "CUSTOMER" ? "16px" : "88px")};
		height: ${props => (props.type === "CUSTOMER" ? "auto" : "88px")};

		// margin-left: ${props => props.type === "CUSTOMER" && 16}px;
		float: ${props => props.type === "CUSTOMER" && "right"};

		border-radius: ${props => props.type === "STORE" && "50%"};
	}
`;

export const EditContainer = styled.div`
	display: flex;

	> div:first-child {
		width: 100%;
		padding: 8px;
	}

	> div:first-child > input {
		padding: 0;
	}

	> div:last-child {
		display: flex;
	}

	> input {
		margin-right: 8px;
	}
`;

export const ValidTextWrapper = styled.div`
	margin-top: 0px !important;
	margin-bottom: 16px;
`;

export const EditFlexContainer = styled.div`
	display: flex;
`;

export const MyPageHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	// align-items: center;
	margin: 56px 24px;

	& img {
		width: ${props => (props.type === "CUSTOMER" ? "16px" : "88px")};
		height: ${props => (props.type === "CUSTOMER" ? "auto" : "88px")};

		// margin-left: ${props => props.type === "CUSTOMER" && 16}px;
		float: ${props => props.type === "CUSTOMER" && "right"};

		border-radius: ${props => props.type === "STORE" && "50%"};
	}
`;

export const MyPageStoreHeaderContainer = styled(MyPageHeaderContainer)`
	align-items: center;

	& img {
		border-radius: 50%;
	}
`;

export const MyPageInfoSection = styled.section`
	width: 70%;
`;

export const MyPageEditIconSection = styled.section`
	width: 30%;

	position: relative;
`;

export const MyPageEditIconFrame = styled.div`
	float: right;
`;

export const MyPageEditButtonFrame = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
`;

export const MyPageEditImg = styled.img`
	cursor: pointer;
	width: 24px !important;
	height: 24px !important;
`;
