import React from "react";

import MyPageHeader from "../../components/myPage/MyPageHeader";
import MyPageOrderList from "../../components/myPage/MyPageOrderList";
import MyPageReviewList from "../../components/myPage/MyPageReviewList";
import MyPageUserInfo from "../../components/myPage/MyPageUserInfo";
import { TabMenuBar } from "../../components/common/TabMenuBar";
import { useRecoilValue } from "recoil";
import { userInfoTypeState } from "../../recoil/userInfo";
import { useEffect } from "react";
import { useOrdersApi } from "../../hooks/useOrdersApi";
import { useReviewsApi } from "../../hooks/useReviewsApi";

function MyPage(props) {
	const userInfoType = useRecoilValue(userInfoTypeState);
	const { ordersApi } = useOrdersApi();
	const reviewsApi = useReviewsApi();

	useEffect(() => {
		ordersApi(userInfoType);
		reviewsApi();
	}, []);

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
