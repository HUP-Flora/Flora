import { atom } from "recoil";

export const orderDetailState = atom({
	key: "orderDetailState",
	default: {
	}
});

export const isShowConfirmModalState = atom({
	key: "isShowConfirmModalState",
	default: false,
});

