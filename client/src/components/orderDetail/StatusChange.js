import { useRecoilState, useRecoilValue } from "recoil";
import { isShowConfirmModalState, orderDetailState } from "../../recoil/orderDetail";
import { StatusChageButton } from "../../styles/orderDetail/ProgressBarStyle";
import ConfirmModal from "./ConfirmModal";
import { decideLeftSize } from "../../utils/orderDetail";

function StatusChange() {
	const { orderType, orderStatus } = useRecoilValue(orderDetailState);
	const [isShowConfirmModal, setIsShowConfirmModal] = useRecoilState(isShowConfirmModalState);

	// 테스트 코드
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);
	const user = "사장";

	const changeStatusHandler = () => {
		// 1. 처음 orderDetail이 렌더링 되면 orderStatus의 모든 정보를 가져오고(orderDetail.js의 useEffect 참고)

		// 2. 현재 recoil로 관리하고 있는 orderDetail안의 orderStatus를 변경한다.
		if (orderType === "DELIVERY") {
			setOrderDetail({
				...orderDetail,
				orderStatus: orderStatus === "결제 완료" ? "배송 중" : "배송 완료",
			});
		} else if (orderType === "PICKUP") {
			setOrderDetail({
				...orderDetail,
				orderStatus: orderStatus === "결제 완료" ? "수령 완료" : "수령 완료",
			});
		}

		// 3. 서버에 orderStatus가 변경되었다고 axios 요청을 보낸다.

		// 4. 모달창 닫아준다.
		setIsShowConfirmModal(false);
	};

	const leftSize = decideLeftSize(orderType, orderStatus);

	return (
		<>
			{!(orderStatus === "결제 전") &&
				!(orderStatus === "배송 완료") &&
				!(orderStatus === "수령 완료") &&
				user === "사장" && (
					<StatusChageButton onClick={() => setIsShowConfirmModal(true)} left={leftSize}>
						변경하기
					</StatusChageButton>
				)}
			{isShowConfirmModal && <ConfirmModal changeStatusHandler={changeStatusHandler} />}
		</>
	);
}

export default StatusChange;
