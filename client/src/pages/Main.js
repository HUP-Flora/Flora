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
import { useNavigate } from "react-router-dom";

import { MainContainer } from "../styles/main/MainStyle";

export function Main() {
	const isSearchStoreModal = useRecoilValue(isSearchStoreModalState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	const userType = useRecoilValue(userInfoTypeState);
	const getUserTypeApi = useGetUserTypeApi();

	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");

		if (token) {
			localStorage.setItem("AccessToken", token);
			getUserTypeApi(token);
		}

		const auth = localStorage.getItem("AccessToken");
		if (!auth) {
			navigate("/login");
		}
	}, [getUserTypeApi]);

	return (
		<>
			{isSearchStoreModal && <StoreModal />}
			{isCalendarModal && <CalendarModal />}
			<MainContainer>
				<MainTopBanner />
				<MainFLolive />
			</MainContainer>
			<TabMenuBar selectedMenu="Main" />
		</>
	);
}
