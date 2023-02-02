import { useRecoilValue } from "recoil";
import {
	giftCardState,
	paymentAmountState,
	receiveUserFirstAddressState,
	receiveUserPhoneState,
	receiveUserSecondAddressState,
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
		receiveUserFirstAddress: useRecoilValue(receiveUserFirstAddressState),
		receiveUserSecondAddress: useRecoilValue(receiveUserSecondAddressState),
		giftCard: useRecoilValue(giftCardState),
		paymentAmount: useRecoilValue(paymentAmountState),
	};
};
