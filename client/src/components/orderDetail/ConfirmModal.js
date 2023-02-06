import PortalReactDom from "react-dom";
import {
	Backdrop,
	ConfirmModalBox,
	ConfirmModalButtonBox,
} from "../../styles/common/modal/ErrorModalStyle";
import React from "react";
import { useSetRecoilState } from "recoil";
import { isShowConfirmModalState } from "../../recoil/orderDetail";

function ConfirmModal({ changeStatusHandler }) {
	const setIsShowConfirmModal = useSetRecoilState(isShowConfirmModalState);

	const closeModal = () => {
		setIsShowConfirmModal(false);
	};
	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={closeModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<ConfirmModalBox>
					<p>주문 상태를 변경하시겠습니까?</p>
					<ConfirmModalButtonBox>
						<button onClick={changeStatusHandler}>네</button>
						<button onClick={closeModal}>아니요</button>
					</ConfirmModalButtonBox>
				</ConfirmModalBox>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default ConfirmModal;
