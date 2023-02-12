import { atom } from "recoil";

export const dateState = atom({
	key: "dateState",
	default: "날짜 선택",
});

export const addressState = atom({
	key: "addressState",
	default: "지역 선택",
});

export const searchBarYearState = atom({
	key: "searchBarYearState",
	default: "",
});

export const searchBarMonthState = atom({
	key: "searchBarMonthState",
	default: "",
});

export const searchBarDayState = atom({
	key: "searchBarDayState",
	default: "",
});

export const searchBarDayOfWeekState = atom({
	key: "searchBarDayOfWeek",
	default: "",
});
