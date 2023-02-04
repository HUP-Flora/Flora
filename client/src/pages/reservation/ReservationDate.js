import StatusBar from "../../components/common/StatusBar";
import {
	DateContainer,
	ReserVationTypeContainer,
	ReservationTypeContent,
	ReservationTypeTitle
} from "./ReservationStyle";
import MyCalendar from "../../components/reservation/MyCalendar";
import "react-calendar/dist/Calendar.css";

function ReservationDate() {
	return (
		<>
			<StatusBar text="플로라이브 예약" />
			<ReserVationTypeContainer>
				<ReservationTypeTitle>플로라이브 날짜를<br/>선택해주세요</ReservationTypeTitle>
				<ReservationTypeContent>날짜와 시간을 선택해주세요</ReservationTypeContent>
				<DateContainer>
					<MyCalendar />
				</DateContainer>
			</ReserVationTypeContainer>
		</>
	);
}

export default ReservationDate;