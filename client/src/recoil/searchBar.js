import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const dateState = atom({
	key: "dateState",
	default: "날짜 선택",
	effects_UNSTABLE: [persistAtom],
});

export const addressState = atom({
	key: "addressState",
	default: "지역 선택",
	effects_UNSTABLE: [persistAtom],
});
