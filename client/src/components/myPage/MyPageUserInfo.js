import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useLogoutApi } from "../../hooks/useLogoutApi";

import {
	BoldText,
	GrayText,
	PointerGrayText,
	PointerText,
	ShadowCard,
} from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";
import { ShadowCardContent } from "../../styles/myPage/MyPageUserInfoStyle";

function MyPageUserInfo(props) {
	const navigate = useNavigate();
	const [cookies, removeCookie] = useCookies(["RefreshToken"]);

	// const logoutApi = useLogoutApi();

	const handleLogout = () => {
		// logoutApi();
		if (cookies.RefreshToken) {
			removeCookie("RefreshToken");
		}
		localStorage.clear();
		navigate("/");
	};

	return (
		<ListContiner paddingBottom="112">
			<ListHeader>
				<BoldText size="19">회원 정보</BoldText>
			</ListHeader>
			<ShadowCard padding="24">
				<ShadowCardContent>
					<PointerText size="19" isBold={true} onClick={handleLogout}>
						로그아웃
					</PointerText>
					<PointerText
						size="19"
						isBold={true}
						color="primary"
						onClick={() => navigate("/mypage/signout")}
					>
						회원탈퇴
					</PointerText>
				</ShadowCardContent>
			</ShadowCard>
		</ListContiner>
	);
}

export default MyPageUserInfo;
