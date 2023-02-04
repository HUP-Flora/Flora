import React from 'react';
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";

function Postcode() {
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const SetIsDaumPostShowState = useSetRecoilState(isDaumPostShowState);

	const handleComplete = (data) => {
		setReceiveUserFirstAddress(data.jibunAddress);
		SetIsDaumPostShowState(false);
	};

	return (
		<DaumPostcodeEmbed
			onComplete={handleComplete}
		/>
	);
}

export default Postcode;