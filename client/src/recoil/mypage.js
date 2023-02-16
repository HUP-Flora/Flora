import { atom } from "recoil";

export const userState = atom({
	key: "userState",
	default: {
		// nickname: "",
		// phoneNumber: "",
	},
});

export const MyPageNicknameState = atom({
	key: "MyPageNicknameState",
	default: "",
});

export const MyPagePhoneNumberState = atom({
	key: "MyPageNumberState",
	default: "",
});

export const isNicknameValidState = atom({
	key: "isNicknameValidState",
	default: true,
});

export const isPhoneNumberValidState = atom({
	key: "isPhoneNumberValidState",
	default: true,
});

export const isEditState = atom({
	key: "isEditState",
	default: false,
});
