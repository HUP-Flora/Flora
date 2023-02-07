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
	RorderDayState,
	RorderMonthState,
	RorderTimeState,
	RorderTypeState,
	RorderYearState
} from "../../recoil/reservation";
import NextButton from "../../components/common/NextButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let placeholder = "시간을 선택해주세요";

function ReservationDate() {
	const [RorderTime, setRorderTime] = useRecoilState(RorderTimeState);
	const RorderType = useRecoilValue(RorderTypeState);
	const RorderYear = useRecoilValue(RorderYearState);
	const RorderMonth = useRecoilValue(RorderMonthState);
	const RorderDay = useRecoilValue(RorderDayState);

	// 백엔드 보낼 데이터 로그 확인
	useEffect(() => {
		console.log("RorderTime: ", RorderTime);
		console.log("RorderType: ", RorderType);
		console.log("RorderYear: ", RorderYear);
		console.log("RorderMonth: ", RorderMonth + 1);
		console.log("RorderDay: ", RorderDay);
		console.log("====================================");
	}, [RorderTime, RorderType, RorderYear, RorderMonth, RorderDay]);


	const options = [
		{ value: "1", label: "09:00 ~ 09:30" },
		{ value: "2", label: "09:30 ~ 10:00" },
		{ value: "3", label: "10:00 ~ 10:30" },
		{ value: "4", label: "10:30 ~ 11:00" },
		{ value: "5", label: "11:00 ~ 11:30" },
		{ value: "6", label: "11:30 ~ 12:00" },
		{ value: "7", label: "12:00 ~ 12:30" },
		{ value: "8", label: "12:30 ~ 13:00" },
		{ value: "9", label: "13:00 ~ 13:30" },
		{ value: "10", label: "13:30 ~ 14:00" },
		{ value: "11", label: "14:00 ~ 14:30" },
		{ value: "12", label: "14:30 ~ 15:00" },
		{ value: "13", label: "15:00 ~ 15:30" },
		{ value: "14", label: "15:30 ~ 16:00" },
		{ value: "15", label: "16:00 ~ 16:30" },
		{ value: "16", label: "16:30 ~ 17:00" },
		{ value: "17", label: "17:00 ~ 17:30" },
		{ value: "18", label: "17:30 ~ 18:00" },
	];

	const disabledOptions = ["3", "4"];

	// placeholder = "휴무일 입니다"

	const navigate = useNavigate();
	const dateNextHandler = () => {
		if (RorderTime === "") {
			return;
		}
		// navigate("/product/:product-id/reservation/complete");
		console.log("storId:", );
		navigate("/reservation/complete");
	};

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
						isOptionDisabled={option => disabledOptions.includes(option.value)}
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
							setRorderTime(e.label);
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
		</>
	);
}

export default ReservationDate;
