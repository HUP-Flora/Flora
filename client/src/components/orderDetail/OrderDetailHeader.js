import {
	OrderDetailHeaderSubTitle,
	OrderDetailHeaderTitle,
	ReportContainer,
} from "../../styles/orderDetail/OrderDetailStyle";
import { orderDetailState } from "../../recoil/orderDetail";
import { useRecoilValue } from "recoil";
import reportImg from "../../assets/orderDetail/siren.png";
import { decideTitle, decideOrderStatus } from "../../utils/orderDetail";
import { userType } from "../../utils/user";
import { NoShowPTag } from "../../styles/common/CommonStyle";

function OrderDetailHeader() {
	const orderDetail = useRecoilValue(orderDetailState);
	const { receiptType, status } = orderDetail;

	const user = userType();

	const nowStatus = decideOrderStatus(status);
	const { titleText, subTitleText } = decideTitle(nowStatus, receiptType, user);

	return (
		<>
			<OrderDetailHeaderTitle dangerouslySetInnerHTML={{ __html: titleText }} />
			<OrderDetailHeaderSubTitle
				dangerouslySetInnerHTML={{ __html: subTitleText }}
				status={nowStatus === "결제 전" && user === "사장"}
			/>
			{nowStatus === "결제 전" && user === "사장" && (
				<ReportContainer>
					<img src={reportImg} alt="reportImg" />
					<NoShowPTag>no-show 신고하기</NoShowPTag>
				</ReportContainer>
			)}
		</>
	);
}

export default OrderDetailHeader;
