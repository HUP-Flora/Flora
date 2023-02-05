import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";
import { storeFirstAddressState } from "../../recoil/signup";

function Postcode() {
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const setStoreFirstAddress = useSetRecoilState(storeFirstAddressState);
	const SetIsDaumPostShowState = useSetRecoilState(isDaumPostShowState);

	const handleComplete = data => {
		setReceiveUserFirstAddress(data.jibunAddress);
		setStoreFirstAddress(data.jibunAddress);
		console.log(data.jibunAddress);
		SetIsDaumPostShowState(false);
	};

	return <DaumPostcodeEmbed onComplete={handleComplete} />;
}

export default Postcode;
