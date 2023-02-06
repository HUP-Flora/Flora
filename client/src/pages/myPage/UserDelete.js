import React, { useState } from "react";

import StatusBar from "../../components/common/StatusBar";
import UserDeleteInfo from "../../components/myPage/UserDeleteInfo";
import UserDeleteButton from "../../components/myPage/UserDeleteButton";

function UserDelete(props) {
	const [isChcked, setIsChcked] = useState(false);
	const [isValid, setIsValid] = useState(true);

	return (
		<div>
			<StatusBar text="회원탈퇴" />
			<UserDeleteInfo isChcked={isChcked} setIsChcked={setIsChcked} isValid={isValid} />
			<UserDeleteButton isChcked={isChcked} setIsValid={setIsValid} />
		</div>
	);
}

export default UserDelete;
