import styled from "styled-components";

export const WidthDoubleButtonToolBar = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const BorderTopButtonToolBar = styled.div`
	border-top: 0.1px solid var(--gray-300);
	background-color: white;
	width: 100%;
	position: fixed;
	bottom: 0px;
	padding: 16px;
`;

export const ButtonToolBar = styled.div`
	border: 1px solid white;
	background-color: white;
	width: calc(100% - 32px);
	position: fixed;
	bottom: 0px;
	padding-bottom: 16px;
`;

export const TabBarDiv = styled.div`
	display: flex;
	border-top: 0.1px solid var(--gray-300);
	background-color: white;
	width: 100%;
	position: fixed;
	bottom: 0px;

	> div:first-child img {
		align-items: center;
		justify-content: center;
	}

	> div:nth-child(2) img {
		height: 100%;
	}

	// 플로라이브 이미지 크기 조정
	> div:nth-child(2) > div:first-child {
		padding-top: 13px;
	}

	// 꽃갈피 이미지 크기 조정
	> div:nth-child(3) > div:first-child {
		padding-top: 13px;
	}
`;

export const TabMenu = styled.div`
	color: ${props => (props.isSelected ? "var(--primary-400)" : "var(--gray-500)")};
	text-align: center;
	font-size: 11px;
	width: 25%;
	height: 72px;
	position: relative;
`;

export const TabImg = styled.img`
	height: 100%;
	align-items: center;
	justify-content: center;
`;

export const TabText = styled.div`
	position: absolute;
	top: 72%;
	left: 50%;
	transform: translate(-50%, -50%);
	white-space: nowrap;
	font-size: 11px;
`;

export const StatusBarDiv = styled.div`
	height: 40px;
	background-color: white;
	text-align: center;
	position: relative;
`;

export const StatusBarText = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 19px;
	font-weight: bold;
`;

export const LeftArrow = styled.img`
	position: absolute;
	top: 50%;
	left: 0%;
	transform: translate(0%, -50%);
`;

export const TabImgWrapper = styled.div`
	height: 55%;
	padding-top: 16px;
`
export const SearchBarContainer = styled.section`
	height: 32px;
	background-color: var(--gray-50);
	border: 1px solid var(--gray-400);
	border-radius: 5px;
	margin: 16px;
	padding: 8px;
	display: flex;
`;

export const SearchBarContent = styled.div`
	cursor: pointer;
	width: 49.8%;
	text-align: center;
`;
