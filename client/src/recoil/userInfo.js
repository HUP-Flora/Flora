import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfoTypeState = atom({
	key: "userTypeState",
	default: "CUSTOMER",
	effects_UNSTABLE: [persistAtom],
});

export const ownersIdState = atom({
	key: "ownersIdState",
	default: 0,
	effects_UNSTABLE: [persistAtom],
});
