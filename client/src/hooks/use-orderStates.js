import { useRecoilValue } from "recoil";
import {
	giftCardState,
	paymentAmountState,
	receiveUserAddressState,
	receiveUserPhoneState,
	receiveUserState,
	sendUserPhoneState,
	sendUserState,
} from "../recoil/chatting";

export const useOrderStates = () => {
	return {
		sendUser: useRecoilValue(sendUserState),
		sendUserPhone: useRecoilValue(sendUserPhoneState),
		receiveUser: useRecoilValue(receiveUserState),
		receiveUserPhone: useRecoilValue(receiveUserPhoneState),
		receiveUserAddress: useRecoilValue(receiveUserAddressState),
		giftCard: useRecoilValue(giftCardState),
		paymentAmount: useRecoilValue(paymentAmountState),
	};
};
