import React from "react";
import PortalReactDom from "react-dom";

import {
	Backdrop,
	Modal,
	FlexBox,
	CalendarModalContainer,
	CalendarFlexBox,
} from "../../styles/common/modal/ModalStyle";
import MyCalendar from "../../components/reservation/MyCalendar";
import { useRecoilState } from "recoil";
import { isCalenderModalState } from "../../recoil/search";
import SearchCalendar from "../../pages/search/SearchCalendar";

function CalendarModal() {
	const [isCalendarModalShow, setIsCalendarModalShow] = useRecoilState(isCalenderModalState);

	const toggleModal = () => {
		setIsCalendarModalShow(false);
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={toggleModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<CalendarModalContainer>
					<SearchCalendar />
				</CalendarModalContainer>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default CalendarModal;
