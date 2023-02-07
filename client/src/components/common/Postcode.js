import axios from "axios";
import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { usePostCodeApi } from "../../hooks/usePostCodeApi";
function Postcode() {
	const postCodeApi = usePostCodeApi();
	const handleComplete = data => {
		postCodeApi(data);

		// PostCodeApi(data).then(address => {
		// 	console.log("컴포넌트에서 받아왔나?", address);
		// 	setLocation({ center: { lat: address["y"], lng: address["x"] }, isPanto: true });
		// });

		// console.log(data.jibunAddress);
		// const test = PostCodeFunction(data.jibunAddress);
		// console.log(test);
	};

	return (
		<>
			<DaumPostcodeEmbed onComplete={handleComplete} />
		</>
	);
}

export default Postcode;
