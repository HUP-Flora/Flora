import { atom } from "recoil";

export const userState = atom({
	key: "userState",
	default: {
		user: {},
	},
});

export const isNicknameValidState = atom({
	key: "isNicknameValidState",
	default: true,
});

export const isPhoneNumberValidState = atom({
	key: "isPhoneNumberValidState",
	default: true,
});

export const isNicknameEditState = atom({
	key: "isNicknameEditState",
	default: false,
});

export const isPhoneNumberEditState = atom({
	key: "isPhoneNumberEditState",
	default: false,
});
