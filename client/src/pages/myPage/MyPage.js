import React from "react";

import MyPageHeader from "../../components/myPage/MyPageHeader";
import MyPageOrderList from "../../components/myPage/MyPageOrderList";
import MyPageReviewList from "../../components/myPage/MyPageReviewList";
import MyPageUserInfo from "../../components/myPage/MyPageUserInfo";
import { TabMenuBar } from "../../components/common/TabMenuBar";

function MyPage(props) {
	// const type = "owner";
	const type = "customer";

	return (
		<>
			<MyPageHeader />
			<MyPageOrderList />
			{type === "customer" && <MyPageReviewList />}
			<MyPageUserInfo />
			<TabMenuBar selectedMenu="MyPage" />
		</>
	);
}

export default MyPage;
