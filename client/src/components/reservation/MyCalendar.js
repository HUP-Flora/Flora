import { useCallback, useEffect } from "react";

import "./MyCalendar.css";
import { useRecoilState } from "recoil";
import {
	RorderDayOfWeekState,
	RorderDayState,
	RorderMonthState,
	RorderYearState,
} from "../../recoil/reservation";

let currDateDiv;

function MyCalendar() {
	const [RorderYear, setRorderYear] = useRecoilState(RorderYearState);
	const [RorderMonth, setRorderMonth] = useRecoilState(RorderMonthState);
	const [RorderDay, setRorderDay] = useRecoilState(RorderDayState);
	const [RorderDayOfWeek, setRorderDayOfWeek] = useRecoilState(RorderDayOfWeekState);

	// 휴뮤일 검사 확인 예정
	// const [RorderHoliday, setRorderHoliday] = useRecoilState(RorderHolidayState);

	const isLeapYear = year => {
		return (
			(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
			(year % 100 === 0 && year % 400 === 0)
		);
	};

	// 현재 날짜에 대한 요일을 구하는 함수
	const getDayOfWeek = useCallback(
		(year, month, day) => {
			const dayOfWeek = new Date(year, month, day).getDay();
			let dayOfWeekStr = "";
			if (dayOfWeek === 0) {
				dayOfWeekStr = "일";
			} else if (dayOfWeek === 1) {
				dayOfWeekStr = "월";
			} else if (dayOfWeek === 2) {
				dayOfWeekStr = "화";
			} else if (dayOfWeek === 3) {
				dayOfWeekStr = "수";
			} else if (dayOfWeek === 4) {
				dayOfWeekStr = "목";
			} else if (dayOfWeek === 5) {
				dayOfWeekStr = "금";
			} else if (dayOfWeek === 6) {
				dayOfWeekStr = "토";
			}
			setRorderDayOfWeek(dayOfWeekStr);
		},
		[setRorderDayOfWeek]
	);

	useEffect(() => {
		// 캘린더
		let calendar = document.querySelector(".calendar");

		const month_names = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const getFebDays = year => {
			return isLeapYear(year) ? 29 : 28;
		};

		const generateCalendar = (month, year) => {
			setRorderYear(year.toString());
			const monthMinus = month + 1;
			setRorderMonth(monthMinus.toString());

			let calendar_days = calendar.querySelector(".calendar-days");
			let calendar_header_year = calendar.querySelector("#year");

			let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			calendar_days.innerHTML = "";

			let currDate = new Date();
			if (!month) month = currDate.getMonth();
			if (!year) year = currDate.getFullYear();

			let curr_month = `${month_names[month]}`;
			month_picker.innerHTML = curr_month;
			calendar_header_year.innerHTML = year;

			// get first day of month

			let first_day = new Date(year, month, 1);

			for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
				let day = document.createElement("div");
				if (i >= first_day.getDay()) {
					day.classList.add("calendar-day-hover");
					day.innerHTML = i - first_day.getDay() + 1;
					day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
					if (
						i - first_day.getDay() + 1 === currDate.getDate() &&
						year === currDate.getFullYear() &&
						month === currDate.getMonth()
					) {
						day.classList.add("curr-date");
						// Sun, Mon, Tue, Wed, Thu, Fri, Sat
						setRorderDay(day.innerText.trim());
						currDateDiv = day;
						getDayOfWeek(year, month, day.innerText.trim());
					}
				}
				calendar_days.appendChild(day);
			}
		};

		let month_list = calendar.querySelector(".month-list");

		month_names.forEach((e, index) => {
			let month = document.createElement("div");
			month.innerHTML = `<div data-month="${index}">${e}</div>`;
			month.querySelector("div").onclick = () => {
				month_list.classList.remove("show");
				curr_month.value = index;
				generateCalendar(index, curr_year.value);
			};
			month_list.appendChild(month);
		});

		let month_picker = calendar.querySelector("#month-picker");

		month_picker.onclick = () => {
			month_list.classList.add("show");
		};

		let currDate = new Date();

		let curr_month = { value: currDate.getMonth() };
		let curr_year = { value: currDate.getFullYear() };

		generateCalendar(curr_month.value, curr_year.value);

		document.querySelector("#prev-year").onclick = () => {
			--curr_year.value;
			generateCalendar(curr_month.value, curr_year.value);
		};

		document.querySelector("#next-year").onclick = () => {
			++curr_year.value;
			generateCalendar(curr_month.value, curr_year.value);
		};
	}, []);

	const ClickDayHandler = e => {
		setRorderDay(e.target.innerText);
		getDayOfWeek(RorderYear, RorderMonth, e.target.innerText);
		if (e.target.classList.contains("calendar-day-hover")) {
			if (currDateDiv) {
				currDateDiv.classList.remove("curr-date");
			}
			currDateDiv = e.target;
			currDateDiv.classList.add("curr-date");
		}
	};

	return (
		<div className="light">
			<div className="calendar">
				<div className="calendar-header">
					<span className="month-picker" id="month-picker">
						February
					</span>
					<div className="year-picker">
						<span className="year-change" id="prev-year">
							<pre>{"<"}</pre>
						</span>
						<span id="year">2021</span>
						<span className="year-change" id="next-year">
							<pre>{">"}</pre>
						</span>
					</div>
				</div>
				<div className="calendar-body">
					<div className="calendar-week-day">
						<div>Sun</div>
						<div>Mon</div>
						<div>Tue</div>
						<div>Wed</div>
						<div>Thu</div>
						<div>Fri</div>
						<div>Sat</div>
					</div>
					<div className="calendar-days" onClick={e => ClickDayHandler(e)}></div>
				</div>
				<div className="month-list"></div>
			</div>
		</div>
	);
}

export default MyCalendar;
