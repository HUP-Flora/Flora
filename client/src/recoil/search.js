import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
	effects_UNSTABLE: [persistAtom],
});
