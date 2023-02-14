import { useCallback, useEffect } from "react";

import "./SearchCalendar.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isCalenderModalState } from "../../recoil/search";
import {
	addressState,
	dateState,
	searchBarDayOfWeekState,
	searchBarDayState,
	searchBarMonthState,
	searchBarYearState,
} from "../../recoil/searchBar";
import { useLocation, useNavigate } from "react-router-dom";

let currDateDiv;

function SearchCalendar() {
	const [date, setDate] = useRecoilState(dateState);
	const [searchYear, setSearchYear] = useRecoilState(searchBarYearState);
	const [searchMonth, setSearchMonth] = useRecoilState(searchBarMonthState);
	const [searchDay, setSearchDay] = useRecoilState(searchBarDayState);
	const [searchDayOfWeek, setSearchDayOfWeek] = useRecoilState(searchBarDayOfWeekState);
	const [isCalendarModalShow, setIsCalendarModalShow] = useRecoilState(isCalenderModalState);
	const address = useRecoilValue(addressState);

	const navigate = useNavigate();
	const location = useLocation();

	const isLeapYear = year => {
		return (
			(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
			(year % 100 === 0 && year % 400 === 0)
		);
	};

	useEffect(() => {
		let currentDate = new Date();
		setSearchYear(currentDate.getMonth() + 1);
		setSearchMonth(currentDate.getFullYear());
	}, []);

	// 현재 날짜에 대한 요일을 구하는 함수
	const getDayOfWeek = useCallback(
		(year, month, day) => {
			const dayOfWeek = new Date(year, month - 1, day).getDay();
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
			setSearchDayOfWeek(dayOfWeekStr);

			return dayOfWeekStr;
		},
		[setSearchDayOfWeek]
	);

	useEffect(() => {
		// let currentDate = new Date();
		// console.log(currentDate, currentDate.getMonth() + 1);
		// setSearchYear(currentDate.getMonth() + 1);
		// setSearchMonth(currentDate.getFullYear());
		// console.log(searchYear, searchMonth);

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
			setSearchYear(year);
			setSearchMonth(month + 1);

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
						setSearchDay(day.innerText.trim());
						currDateDiv = day;
						getDayOfWeek(year, month + 1, day.innerText.trim());
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
		setSearchDay(e.target.innerText);
		setDate(`${searchYear}년 ${searchMonth}월 ${searchDay}일 ${searchDayOfWeek}요일`);
		const dayOfWeekData = getDayOfWeek(searchYear, searchMonth, e.target.innerText);
		if (e.target.classList.contains("calendar-day-hover")) {
			if (currDateDiv) {
				currDateDiv.classList.remove("curr-date");
			}
			currDateDiv = e.target;
			currDateDiv.classList.add("curr-date");
			setIsCalendarModalShow(!isCalendarModalShow);
		}

		if (location.pathname === "/search") {
			navigate(
				`/search?address=${address}&year=${searchYear}&month=${searchMonth}&day=${e.target.innerText}&dayOfWeek=${dayOfWeekData}`
			);
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

export default SearchCalendar;
