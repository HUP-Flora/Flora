import axios from "axios";
import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";
import { storeFirstAddressState } from "../../recoil/signup";
function Postcode() {
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const setIsDaumPostShow = useSetRecoilState(isDaumPostShowState);
	const setStoreFirstAddress = useSetRecoilState(storeFirstAddressState);
	const handleComplete = data => {
		setStoreFirstAddress(data.jibunAddress);
		setReceiveUserFirstAddress(data.jibunAddress);
		setIsDaumPostShow(false);
	};

	return (
		<>
			<DaumPostcodeEmbed onComplete={handleComplete} />
		</>
	);
}

export default Postcode;
