import { atom } from "recoil";

export const reservationsState = atom({
	key: "reservationsState",
	default: [],
});

export const waitingReservationsState = atom({
	key: "waitingReservationsState",
	default: [],
});
