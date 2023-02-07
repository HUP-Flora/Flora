import { atom } from "recoil";

export const userState = atom({
	key: "userState",
	default: "",
});

export const nicknameState = atom({
	key: "nicknameState",
	default: "",
});

export const phoneNumberState = atom({
	key: "phoneNumberState",
	default: "",
});

export const storeImageFileState = atom({
	key: "storeImageFileState",
	default: "",
});

export const storeImagePreviewState = atom({
	key: "storeImagePreviewState",
	default: "",
});

export const storeNameState = atom({
	key: "storeNameState",
	default: "",
});

export const storeRegionDepthNameState = atom({
	key: "storeRegionDepthNameState",
	default: { region_1depth_name: "", region_2depth_name: "", region_3depth_name: "" },
});
export const storeFirstAddressState = atom({
	key: "storeFirstAddressState",
	default: "",
});

export const storeSecondAddressState = atom({
	key: "storeSecondAddressState",
	default: "",
});

export const storeDescriptionState = atom({
	key: "storeDescriptionState",
	default: "",
});

export const storeStartTimeState = atom({
	key: "storeStartTimeState",
	default: { value: 18, label: "09:00" },
});

export const storeEndTimeState = atom({
	key: "storeEndTimeState",
	default: { value: 36, label: "18:00" },
});

export const storeHolidayState = atom({
	key: "holidayState",
	default: [false, false, false, false, false, false, false],
});

export const storeBrnState = atom({
	key: "brnState",
	default: "",
});

export const accessTokenState = atom({
	key: "accessTokenState",
	default: "",
});
