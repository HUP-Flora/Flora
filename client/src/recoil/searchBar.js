import { atom } from "recoil";

export const dateState = atom({
	key: "dateState",
	default: "날짜 선택",
});

export const addressState = atom({
	key: "addressState",
	default: "지역 선택",
});
