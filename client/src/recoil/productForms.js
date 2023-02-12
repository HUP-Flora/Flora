import { atom } from "recoil";

export const productState = atom({
	key: "productState",
	default: {
		name: "",
		desc: "",
		pid: 0,
		pimg: "",
		price: "",
	},
});

export const imageFileState = atom({
	key: "imageFileState",
	default: "",
});
