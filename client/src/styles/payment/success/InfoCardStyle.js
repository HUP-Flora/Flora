import styled from "styled-components";

export const InfoCardSection = styled.div`
	height: 196px;
	background-color: white;
	padding: 24px;
`;

export const TableTh = styled.th`
	width: 100px;
	text-align: left;
`;

// 2번째 요소를 가져오는건 성공했으나 CSS3에서부터 표에 margin, padding을 넣는 것이 불가능하다고 한다.
// export const TableBody = styled.tbody`
// 	& > tr:nth-child(2) {
// 		padding: 20px;
// 	}
// `;

export const TableMargin = styled.tr`
	height: 20px;
`;

export const InfoCardHr = styled.hr`
	margin-top: 16px;
	margin-bottom: 24px;
`;
