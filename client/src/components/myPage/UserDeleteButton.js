import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignoutApi } from "../../hooks/useSignoutApi";
import { useCookies } from "react-cookie";

import { Primary400Button } from "../../styles/button/ButtonStyle";
import { BottomButtonContainer } from "../../styles/common/CommonStyle";

function UerDeleteButton({ isChcked, setIsValid }) {
	const [cookies, removeCookie] = useCookies(["RefreshToken"]);
	const signoutApi = useSignoutApi();
	const navigate = useNavigate();

	const handleClick = () => {
		// 유효성 검사
		if (isChcked === false) {
			setIsValid(false);
		} else {
			// (백) 탈퇴 request
			setIsValid(true);
			signoutApi();
			if (cookies.RefreshToken) {
				removeCookie("RefreshToken");
			}
			localStorage.clear();
			navigate("/");
		}
	};

	return (
		<BottomButtonContainer>
			<Primary400Button onClick={handleClick}>탈퇴하기</Primary400Button>
		</BottomButtonContainer>
	);
}

export default UerDeleteButton;
