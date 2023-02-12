import { TabMenuBar } from "../components/common/TabMenuBar";
import { useEffect } from "react";
import { useGetUserTypeApi } from "../hooks/useGetUserTypeApi";
import { useRecoilValue } from "recoil";
import StoreModal from "./search/StoreModal";
import CalendarModal from "../components/common/CalendarModal";
import { isCalenderModalState, isSearchStoreModalState } from "../recoil/search";
import { userInfoTypeState } from "../recoil/userInfo";
import MainTopBanner from "../components/main/MainTopBanner";
import MainFLolive from "../components/main/MainFLolive";

export function Main() {
	const isSearchStoreModal = useRecoilValue(isSearchStoreModalState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	const userType = useRecoilValue(userInfoTypeState);
	const getUserTypeApi = useGetUserTypeApi();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");

		console.log(token);

		if (token) {
			localStorage.setItem("AccessToken", token);
			getUserTypeApi(token);
		}
	}, [getUserTypeApi]);

	return (
		<>
			{isSearchStoreModal && <StoreModal />}
			{isCalendarModal && <CalendarModal />}
			<MainTopBanner />
			<MainFLolive />
			<TabMenuBar selectedMenu="Main" />
		</>
	);
}
