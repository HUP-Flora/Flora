import React from "react";
import { useNavigate } from "react-router-dom";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";
import { ShadowCardContent } from "../../styles/myPage/MyPageUserInfoStyle";

function MyPageUserInfo(props) {
	const navigate = useNavigate();

	const handleLogout = () => {
		// (백) 로그아웃
		// navigate("/");
	};

	return (
		<ListContiner paddingBottom="112">
			<ListHeader>
				<BoldText size="19">회원 정보</BoldText>
			</ListHeader>
			<ShadowCard padding="24">
				<ShadowCardContent>
					<BoldText size="19" onClick={handleLogout}>
						로그아웃
					</BoldText>
					<BoldText size="19" onClick={() => navigate("signout")}>
						회원탈퇴
					</BoldText>
				</ShadowCardContent>
			</ShadowCard>
		</ListContiner>
	);
}

export default MyPageUserInfo;
