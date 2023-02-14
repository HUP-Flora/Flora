import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { GrayText } from "../../styles/common/CommonStyle";

import { EmptyContainer } from "../../styles/common/CommonStyle";

function MyPageListEmpty({ text }) {
	let location = useLocation();

	const [isList, setIsList] = useState(location.pathname.includes("list"));

	useEffect(() => {
		setIsList(location.pathname.includes("list"));
	}, []);

	return (
		<EmptyContainer isFull={isList} exceptHeight="150">
			{text} 없어요.
		</EmptyContainer>
	);
}

export default MyPageListEmpty;
