import { atom } from "recoil";

export const LmyTypeState = atom({
	key: "LmyTypeState",
	default: "",
});

export const LmySessionIdState = atom({
	key: "LmySessionIdState",
	default: "",
});

export const LliveStatusState = atom({
	key: "LliveStatusState",
	default: "",
});

export const LorderNumberState = atom({
	key: "LorderNumberState",
	default: "",
});

export const OrderSuccessDataState = atom({
	key: "OrderSuccessDataState",
	default: {
		sName: "",
		addressName: "",
		payment: 0,
		phoneNumber: "",
		recType: "",
		recDeliveryDestination: "",
	},
});

export const LpaymentAmountState = atom({
	key: "LpaymentAmountState",
	default: 0,
});