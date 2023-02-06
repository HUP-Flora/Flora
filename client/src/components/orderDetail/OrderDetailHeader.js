import {
	OrderDetailHeaderSubTitle,
	OrderDetailHeaderTitle,
	ReportContainer,
} from "../../styles/orderDetail/OrderDetailStyle";
import { orderDetailState } from "../../recoil/orderDetail";
import { useRecoilValue } from "recoil";
import reportImg from "../../assets/orderDetail/siren.png";
import { decideTitle } from "../../utils/orderDetail";

function OrderDetailHeader() {
	const orderDetail = useRecoilValue(orderDetailState);
	const { orderType, orderStatus } = orderDetail;

	const user = "사장";

	const { titleText, subTitleText  } = decideTitle(orderStatus, orderType, user);

	return (
		<>
			<OrderDetailHeaderTitle dangerouslySetInnerHTML={{ __html: titleText }} />
			<OrderDetailHeaderSubTitle
				dangerouslySetInnerHTML={{ __html: subTitleText }}
				status={orderStatus === "결제 전"}
			/>
			{orderStatus === "결제 전" && (
				<ReportContainer>
					<img src={reportImg} alt="reportImg" />
					<p>no-show 신고하기</p>
				</ReportContainer>
			)}
		</>
	);
}

export default OrderDetailHeader;
