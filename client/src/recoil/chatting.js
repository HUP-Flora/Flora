import { atom } from "recoil";

export const sendUserState = atom({
	key: "sendUserState",
	default: "",
});

export const sendUserPhoneState = atom({
	key: "sendUserPhoneState",
	default: "",
});

export const giftCardState = atom({
	key: "giftCardState",
	default: "",
});

export const paymentAmountState = atom({
	key: "paymenAmountState",
	default: "",
});

export const receiveUserState = atom({
	key: "receiveUserState",
	default: "",
});

export const receiveUserPhoneState = atom({
	key: "receiveUserPhoneState",
	default: "",
});

export const receiveUserFirstAddressState = atom({
	key: "receiveUserFirstAddressState",
	default: "",
});

export const receiveUserSecondAddressState = atom({
	key: "receiveUserSecondAddressState",
	default: "",
});

// 이거 임시로 만든거임
// name이 user가 될 것이고
// room이 주문번호? 가 될 듯
export const nameState = atom({
	key: "nameState",
	default: "",
});

export const roomState = atom({
	key: "roomState",
	default: "",
});

export const isErrorModalShowState = atom({
	key: 'isErrorModalShowState',
	default: false,
});

export const isDaumPostShowState = atom({
	key: 'isDaumPostShowState',
	default: false,
});

export const isSubmitState = atom({
	key: 'isSubmitState',
	default: false,
});

export const orderTypeState = atom({
	key: 'orderTypeState',
	default: 'PICKUP',
});

export const orderStatesState = atom({
	key: 'orderStatesState',
	default: {},
});
