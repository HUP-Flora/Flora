import React from 'react';
import DaumPostcodeEmbed from "react-daum-postcode";

function Postcode() {
	const [address, setAddress] = React.useState("");

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
		setAddress(fullAddress);
		console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
	};

	const handleSearch = (data) => {
		console.log(data);
	};

	return (
		<DaumPostcodeEmbed
			onComplete={handleComplete}
			onSearch={handleSearch}
		/>
	);
}

export default Postcode;