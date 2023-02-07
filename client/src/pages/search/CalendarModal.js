import React from "react";
import PortalReactDom from "react-dom";

import { Backdrop, Modal, FlexBox } from "../../styles/common/modal/ModalStyle";
import MyCalendar from "../../components/reservation/MyCalendar";
import { useRecoilState } from "recoil";
import { isCalenderModalState } from "../../recoil/search";

function CalendarModal() {
	const [isCalendarModalShow, setIsCalendarModalShow] = useRecoilState(isCalenderModalState);

	const toggleModal = () => {
		setIsCalendarModalShow(!isCalendarModalShow);
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={toggleModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<Modal>
					<FlexBox>
						<MyCalendar />
					</FlexBox>
				</Modal>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default CalendarModal;
