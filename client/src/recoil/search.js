import { atom } from "recoil";

export const isCalenderModalState = atom({
	key: "isCalenderModalState",
	default: false,
});

export const isSearchStoreModalState = atom({
	key: "isSearchStoreModalState",
	default: false,
});

export const resultAddressListState = atom({
	key: "resultAddressListState",
	default: [],
});

export const storeListState = atom({
	key: "storeListState",
	default: [],
});
