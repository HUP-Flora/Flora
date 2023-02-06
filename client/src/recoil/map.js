import { atom } from "recoil";

export const locationState = atom({
	key: "locationState",
	default: { center: { lat: 0, lng: 0 }, isPanto: false },
});

export const levelState = atom({
	key: "levelState",
	default: 3,
});
