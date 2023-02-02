import React from 'react';
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";

function Postcode() {
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const SetIsDaumPostShowState = useSetRecoilState(isDaumPostShowState);

	const handleComplete = (data) => {
		console.log('handleComplete', data);
		let fullAddress = data.address;
		let extraAddress = "";
		// console.log(data);
		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}
		setReceiveUserFirstAddress(fullAddress);
		SetIsDaumPostShowState(false);
	};

	return (
		<DaumPostcodeEmbed
			onComplete={handleComplete}
		/>
	);
}

export default Postcode;