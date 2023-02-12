import { TabMenuBar } from "../components/common/TabMenuBar";
import { SearchBar } from "../components/common/SearchBar";
import { useEffect } from "react";
import { useGetUserTypeApi } from "../hooks/useGetUserTypeApi";
import { useRecoilValue } from "recoil";
import StoreModal from "./search/StoreModal";
import CalendarModal from "../components/common/CalendarModal";
import { isCalenderModalState, isSearchStoreModalState } from "../recoil/search";
import { userTypeState } from "../recoil/userInfo";

export function Main() {
	const isSearchStoreModal = useRecoilValue(isSearchStoreModalState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	const userType = useRecoilValue(userTypeState);
	const getUserTypeApi = useGetUserTypeApi();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");
		if (token) {
			localStorage.setItem("AccessToken", token);
			getUserTypeApi(token);
		}
	}, [getUserTypeApi]);

	return (
		<>
			{isSearchStoreModal && <StoreModal />}
			{isCalendarModal && <CalendarModal />}
			<SearchBar />
			<TabMenuBar userType={userType} selectedMenu="Main" />
		</>
	);
}
