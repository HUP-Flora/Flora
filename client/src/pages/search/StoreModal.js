import React from "react";
import PortalReactDom from "react-dom";

import {
	Backdrop,
	Modal,
	FlexBox,
	CalendarModalContainer,
	CalendarFlexBox,
	SearchStoreModalContainer,
} from "../../styles/common/modal/ModalStyle";
import MyCalendar from "../../components/reservation/MyCalendar";
import { useRecoilState } from "recoil";
import { isCalenderModalState, isSearchStoreModalState } from "../../recoil/search";
import SearchCalendar from "./SearchCalendar";
import { isDaumPostShowState } from "../../recoil/chatting";
import { SearchStore, SearchStoreModal } from "./SearchStore";

function StoreModal() {
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);

	const toggleModal = () => {
		setIsSearchStoreModal(false);
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={toggleModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<SearchStoreModalContainer>
					<SearchStore />
				</SearchStoreModalContainer>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default StoreModal;
