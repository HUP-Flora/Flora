import { StatusBar } from "../../components/common/StatusBar";
import { KakaoMap } from "../../components/map/KakaoMap";
import { BlankSection, WhiteLayout } from "../../styles/common/CommonStyle";
import { ArrowSection, StoreListBottomSheet } from "../../styles/map/MapStyle";
import topArrow from "../../assets/arrow/TopArrow.png";
import bottomArrow from "../../assets/arrow/BottomArrow.png";
import { StoreList } from "../../components/common/StoreList";
import { SearchBar } from "../../components/common/SearchBar";
import { ArrowImage } from "../../styles/icon/IconStyle";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDaumPostShowState } from "../../recoil/chatting";
import PostcodeModal from "../../components/common/PostcodeModal";
import { isCalenderModalState, isSearchStoreModalState } from "../../recoil/search";
import CalendarModal from "../../components/common/CalendarModal";
import { SearchContainer } from "../../styles/common/modal/ModalStyle";
import StoreModal from "./StoreModal";
import { useSearchAddressApi } from "../../hooks/useSearchAddressApi";
import {
	addressState,
	searchBarDayOfWeekState,
	searchBarDayState,
	searchBarMonthState,
	searchBarYearState,
} from "../../recoil/searchBar";
import { useSearchStoresApi } from "../../hooks/useSearchStoresApi";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import { useParams } from "react-router-dom";

export function Search() {
	const [storeListLargeMode, setStoreListLargeMode] = useState(false);
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	const setAddress = useSetRecoilState(addressState);
	const setSearchBarYear = useSetRecoilState(searchBarYearState);
	const setSearchBarMonth = useSetRecoilState(searchBarMonthState);
	const setSearchBarDay = useSetRecoilState(searchBarDayState);
	const setSearchBarDayOfWeek = useSetRecoilState(searchBarDayOfWeekState);
	const searchStoresApi = useSearchStoresApi();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const address = params.get("address");
		const year = params.get("year");
		const month = params.get("month");
		const day = params.get("day");
		const dayOfWeek = params.get("dayOfWeek");
		setAddress(address);
		setSearchBarYear(year);
		setSearchBarMonth(month);
		setSearchBarDay(day);
		setSearchBarDayOfWeek(dayOfWeek);
		searchStoresApi(address, dayOfWeek);
	}, [
		searchStoresApi,
		setAddress,
		setSearchBarYear,
		setSearchBarMonth,
		setSearchBarDay,
		setSearchBarDayOfWeek,
	]);

	return (
		<SearchContainer>
			{isSearchStoreModal && <StoreModal />}
			{isCalendarModal && <CalendarModal />}
			<NoPaddingStatusBar text="꽃집 검색" />
			<SearchBar />
			<BlankSection height="16" />
			<KakaoMap />
			<StoreListBottomSheet isLarge={storeListLargeMode}>
				<ArrowSection>
					<ArrowImage
						src={storeListLargeMode ? bottomArrow : topArrow}
						alt="arrow"
						onClick={() => {
							setStoreListLargeMode(!storeListLargeMode);
						}}
					/>
				</ArrowSection>
				<StoreList />
			</StoreListBottomSheet>
		</SearchContainer>
	);
}
