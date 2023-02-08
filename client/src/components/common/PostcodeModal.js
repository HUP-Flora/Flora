import React from "react";
import { isDaumPostShowState } from "../../recoil/chatting";
import { useSetRecoilState } from "recoil";
import PortalReactDom from "react-dom";
import { Backdrop, PostModal } from "../../styles/common/modal/ErrorModalStyle";
import Postcode from "./Postcode";
import CalendarModal from "./CalendarModal";

function PostcodeModal() {
	const setIsDaumPostShow = useSetRecoilState(isDaumPostShowState);

	const closePostcodeModal = () => {
		setIsDaumPostShow(false);
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={closePostcodeModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<PostModal>
					<Postcode />
				</PostModal>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default PostcodeModal;
