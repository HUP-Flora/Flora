import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const locationState = atom({
	key: "locationState",
	default: { center: { lat: 0, lng: 0 }, isPanto: false },
	effects_UNSTABLE: [persistAtom],
});

export const levelState = atom({
	key: "levelState",
	default: 3,
	effects_UNSTABLE: [persistAtom],
});
