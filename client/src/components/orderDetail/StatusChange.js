import { useRecoilState, useRecoilValue } from "recoil";
import { isShowConfirmModalState, orderDetailState } from "../../recoil/orderDetail";
import { StatusChageButton } from "../../styles/orderDetail/ProgressBarStyle";
import ConfirmModal from "./ConfirmModal";
import { decideLeftSize, decideOrderStatus } from "../../utils/orderDetail";
import { userType } from "../../utils/user";
import useOrderDetail from "../../hooks/useOrderDetail";

function StatusChange({oId}) {
	const { receiptType, status } = useRecoilValue(orderDetailState);
	const [isShowConfirmModal, setIsShowConfirmModal] = useRecoilState(isShowConfirmModalState);

	const nowStatus = decideOrderStatus(status);

	// 테스트 코드
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);
	const user = userType();

	const { changeOrderStatusAPI } = useOrderDetail();

	const changeStatusHandler = () => {
		// 1. 처음 orderDetail이 렌더링 되면 orderStatus의 모든 정보를 가져오고(orderDetail.js의 useEffect 참고)

		// 2. 현재 recoil로 관리하고 있는 orderDetail안의 orderStatus를 변경한다.
		if (receiptType === "배달") {
			setOrderDetail({
				...orderDetail,
				status: status === 1 ? 2 : 3,
			});
		} else if (receiptType === "픽업") {
			setOrderDetail({
				...orderDetail,
				status: status === 1 ? 5 : 5,
			});
		}

		// 3. 서버에 orderStatus가 변경되었다고 axios 요청을 보낸다.
		changeOrderStatusAPI(oId);

		// 4. 모달창 닫아준다.
		setIsShowConfirmModal(false);
	};

	const leftSize = decideLeftSize(receiptType, nowStatus);

	return (
		<>
			{!(nowStatus === "결제 전") &&
				!(nowStatus === "배송 완료") &&
				!(nowStatus === "수령 완료") &&
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
