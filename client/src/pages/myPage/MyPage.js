import React from "react";

import MyPageHeader from "../../components/myPage/MyPageHeader";
import MyPageOrderList from "../../components/myPage/MyPageOrderList";
import MyPageReviewList from "../../components/myPage/MyPageReviewList";
import MyPageUserInfo from "../../components/myPage/MyPageUserInfo";
import { TabMenuBar } from "../../components/common/TabMenuBar";
import { useRecoilValue } from "recoil";
import { userInfoTypeState } from "../../recoil/userInfo";

function MyPage(props) {
	const userInfoType = useRecoilValue(userInfoTypeState);

	return (
		<>
			<MyPageHeader />
			<MyPageOrderList />
			{userInfoType === "CUSTOMER" && <MyPageReviewList />}
			<MyPageUserInfo />
			<TabMenuBar selectedMenu="MyPage" />
		</>
	);
}

export default MyPage;
