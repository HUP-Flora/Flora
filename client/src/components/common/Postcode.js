import axios from "axios";
import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";
function Postcode() {
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const setIsDaumPostShow = useSetRecoilState(isDaumPostShowState);

	const handleComplete = data => {
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
