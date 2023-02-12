import { atom } from "recoil";

export const productState = atom({
	key: "productState",
	default: {},
});

export const imageFileState = atom({
	key: "imageFileState",
	default: "",
});
