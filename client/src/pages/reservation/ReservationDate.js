import StatusBar from "../../components/common/StatusBar";
import {
	DateContainer,
	ReserVationTypeContainer,
	ReservationTypeContent,
	ReservationTypeTitle,
	RFooter,
	RFooterContent,
	RFooterTitle,
	RFooterTitleContainer,
	TimeContainer,
} from "../../styles/reservation/ReservationStyle";
import MyCalendar from "../../components/reservation/MyCalendar";
import Select from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	RisModalShowState,
	RorderDayOfWeekState,
	RorderDayState,
	RorderHolidayState,
	RorderMonthState,
	RorderTimeAvailableState,
	RorderTimeState,
	RorderTypeState,
	RorderYearState,
} from "../../recoil/reservation";
import NextButton from "../../components/common/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ReservationWarningModal from "../../components/reservation/ReservationWarningModal";
import useReservation from "../../hooks/useReservation";

function ReservationDate() {
	const [RorderTime, setRorderTime] = useRecoilState(RorderTimeState);
	const RorderType = useRecoilValue(RorderTypeState);
	const RorderYear = useRecoilValue(RorderYearState);
	const RorderMonth = useRecoilValue(RorderMonthState);
	const RorderDay = useRecoilValue(RorderDayState);

	const RorderTimeAvailable = useRecoilValue(RorderTimeAvailableState);
	const RorderHoliday = useRecoilValue(RorderHolidayState);

	const RorderDayOfWeek = useRecoilValue(RorderDayOfWeekState);
	const [RisModalShow, setRisModalShow] = useRecoilState(RisModalShowState);

	const { getHolidayAPI, getAvailableTimeAPI, submitReservationAPI } = useReservation();

	// 휴무일 받아오기
	useEffect(() => {
		getHolidayAPI();
	}, [getHolidayAPI]);

	// 보낼 날짜 가공
	const formatRorderMonth = RorderMonth < 10 ? `0${RorderMonth}` : RorderMonth;
	const formatRoderDay = RorderDay < 10 ? `0${RorderDay}` : RorderDay;
	const date = RorderYear + "-" + formatRorderMonth + "-" + formatRoderDay;

	// 예약 가능 시간 받아오기
	useEffect(() => {
		getAvailableTimeAPI(date);
	}, [getAvailableTimeAPI, date]);

	// 예약 완료 버튼 클릭
	const navigate = useNavigate();
	const { sId, pId } = useParams();
	const dateNextHandler = () => {
		if (RorderTime === "") {
			setRisModalShow(true);
			return;
		}
		const reserveData ={
			sid: sId,
			pid: pId,
			reservationDate: date,
			reservationTime: RorderTime,
		}

		submitReservationAPI(reserveData);
	};

	let placeholder = "시간을 선택해주세요";
	const holiday = RorderHoliday.split(",");
	// 휴무일이면
	if (holiday.includes(RorderDayOfWeek)) {
		placeholder = "휴무일 입니다";
	}

	const options = [
		{ value: 18, label: "09:00 ~ 09:30" },
		{ value: 19, label: "09:30 ~ 10:00" },
		{ value: 20, label: "10:00 ~ 10:30" },
		{ value: 21, label: "10:30 ~ 11:00" },
		{ value: 22, label: "11:00 ~ 11:30" },
		{ value: 23, label: "11:30 ~ 12:00" },
		{ value: 24, label: "12:00 ~ 12:30" },
		{ value: 25, label: "12:30 ~ 13:00" },
		{ value: 26, label: "13:00 ~ 13:30" },
		{ value: 27, label: "13:30 ~ 14:00" },
		{ value: 28, label: "14:00 ~ 14:30" },
		{ value: 29, label: "14:30 ~ 15:00" },
		{ value: 30, label: "15:00 ~ 15:30" },
		{ value: 31, label: "15:30 ~ 16:00" },
		{ value: 32, label: "16:00 ~ 16:30" },
		{ value: 33, label: "16:30 ~ 17:00" },
		{ value: 34, label: "17:00 ~ 17:30" },
		{ value: 35, label: "17:30 ~ 18:00" },
	];

	return (
		<>
			<StatusBar text="플로라이브 예약" />
			<ReserVationTypeContainer>
				<ReservationTypeTitle>
					플로라이브 날짜를
					<br />
					선택해주세요
				</ReservationTypeTitle>
				<ReservationTypeContent>날짜와 시간을 선택해주세요</ReservationTypeContent>
				<DateContainer>
					<MyCalendar />
				</DateContainer>
				<TimeContainer>
					<Select
						options={options}
						isOptionDisabled={option => RorderTimeAvailable.includes(option.value)}
						styles={{
							control: provided => ({
								...provided,
								boxShadow: "none",
								border: "1px solid #ADB5BD",
								borderRadius: "10px",
								textAlign: "center",
								height: "48px",
							}),
						}}
						placeholder={placeholder}
						onChange={e => {
							setRorderTime(e.value);
						}}
						isSearchable={false}
						isDisabled={placeholder === "휴무일 입니다"}
					/>
				</TimeContainer>
			</ReserVationTypeContainer>
			<RFooter>
				<RFooterTitleContainer>
					<RFooterTitle>결제 금액</RFooterTitle>
					<RFooterTitle>10,000원</RFooterTitle>
				</RFooterTitleContainer>
				<RFooterContent>
					결제 금액은 플로라이브에서 추가되는
					<br />
					옵션에 따라 변동될 수 있습니다.
				</RFooterContent>
			</RFooter>
			<NextButton onClick={dateNextHandler} isNotFixed={true} text="다음으로" />
			{RisModalShow && <ReservationWarningModal text="시간을 선택해주세요." />}
		</>
	);
}

export default ReservationDate;
