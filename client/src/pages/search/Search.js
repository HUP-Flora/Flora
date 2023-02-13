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
import { storeListState } from "../../recoil/search";
import { useSearchStoresApi } from "../../hooks/useSearchStoresApi";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import { useParams } from "react-router-dom";

export function Search() {
	const [storeListLargeMode, setStoreListLargeMode] = useState(false);
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	const setStoreList = useSetRecoilState(storeListState);
	const setAddress = useSetRecoilState(addressState);
	const [searchBarYear, setSearchBarYear] = useRecoilState(searchBarYearState);
	const [searchBarMonth, setSearchBarMonth] = useRecoilState(searchBarMonthState);
	const setSearchBarDay = useSetRecoilState(searchBarDayState);
	const setSearchBarDayOfWeek = useSetRecoilState(searchBarDayOfWeekState);
	const searchStoresApi = useSearchStoresApi();

	useEffect(() => {
		const currentDate = new Date();
		const params = new URLSearchParams(window.location.search);
		const address = params.get("address");
		const year = params.get("year") && searchBarYear;
		const month = params.get("month") && searchBarMonth;
		const day = params.get("day");
		const dayOfWeek = params.get("dayOfWeek");
		setAddress(address ? address : "");
		setSearchBarYear(year ? year : currentDate.getFullYear());
		setSearchBarMonth(month ? month : currentDate.getMonth() + 1);
		setSearchBarDay(day ? day : "");
		setSearchBarDayOfWeek(dayOfWeek ? dayOfWeek : "");
		if (address && dayOfWeek) {
			searchStoresApi(address, dayOfWeek);
		} else {
			setStoreList([]);
		}
	}, [
		searchStoresApi,
		setAddress,
		setSearchBarYear,
		setSearchBarMonth,
		setSearchBarDay,
		setSearchBarDayOfWeek,
		setStoreList,
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
