import { BoldTextDiv } from "../../../styles/common/BoldTextStyle";
import {
	InfoCardHr,
	InfoCardSection,
	TableMargin,
	TableTh,
} from "../../../styles/payment/success/InfoCardStyle";

export function InfoCard({ type, content1, content2, content3 }) {
	let titles;
	if (type === "가게 정보") {
		titles = ["상호명", "주소", "전화번호"];
	} else {
		titles = ["분류", "배송지", "결제금액"];
	}

	return (
		<InfoCardSection>
			<>
				<BoldTextDiv size="19">{type}</BoldTextDiv>
				<InfoCardHr />
				<table>
					<tbody>
						<tr>
							<TableTh>{titles[0]}</TableTh>
							<td>{content1}</td>
						</tr>
						<TableMargin />
						<tr>
							<TableTh>{titles[1]}</TableTh>
							<td>{content2}</td>
						</tr>
						<TableMargin />
						<tr>
							<TableTh>{titles[2]}</TableTh>
							<td>{content3}</td>
						</tr>
					</tbody>
				</table>
			</>
		</InfoCardSection>
	);
}
