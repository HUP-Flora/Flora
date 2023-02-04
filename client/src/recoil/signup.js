import { atom } from "recoil";

export const userState = atom({
	key: "userState",
	default: "user",
});

export const holidayState = atom({
	key: "holidayState",
	default: [false, false, false, false, false, false, false],
});
