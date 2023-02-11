import { atom } from "recoil";

export const storeState = atom({
	key: "storeState",
	default: {
		store: {},
	},
});

export const isFloMarkClickedState = atom({
	key: "isFloMarkClickedState",
	default: false,
});

export const reviewCountState = atom({
	key: "reviewCount",
	default: 0,
});

export const productsState = atom({
	key: "productsState",
	default: [],
});

export const storeReviewsState = atom({
	key: "storeReviewsState",
	default: [],
});
