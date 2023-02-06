import axios from "axios";
import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../../recoil/chatting";
import { locationState } from "../../recoil/map";
import { addressState } from "../../recoil/searchBar";
import { storeFirstAddressState } from "../../recoil/signup";

function Postcode() {
	const setLocation = useSetRecoilState(locationState);
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const setStoreFirstAddress = useSetRecoilState(storeFirstAddressState);
	const setAddress = useSetRecoilState(addressState);
	const setIsDaumPostShowState = useSetRecoilState(isDaumPostShowState);

	const handleComplete = data => {
		axios({
			method: "GET",
			url: `https://dapi.kakao.com/v2/local/search/address.json?&query=${data.jibunAddress}`,
			headers: {
				Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
			},
		}).then(response => {
			const address = response.data.documents[0].address;
			console.log(address);
			setLocation({ center: { lat: address["y"], lng: address["x"] }, isPanto: true });
		});
		setReceiveUserFirstAddress(data.jibunAddress);
		setStoreFirstAddress(data.jibunAddress);
		setAddress(data.jibunAddress);
		setIsDaumPostShowState(false);
	};

	return <DaumPostcodeEmbed onComplete={handleComplete} />;
}

export default Postcode;
