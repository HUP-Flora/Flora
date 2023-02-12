import { useRecoilState, useRecoilValue } from "recoil";
import { isDaumPostShowState } from "../../recoil/chatting";
import { isCalenderModalState, isSearchStoreModalState } from "../../recoil/search";
import {
	addressState,
	dateState,
	searchBarDayOfWeekState,
	searchBarDayState,
	searchBarMonthState,
	searchBarYearState,
} from "../../recoil/searchBar";
import { SearchBarContainer, SearchBarContent } from "../../styles/bar/BarStyle";
import { Text, GrayText } from "../../styles/common/CommonStyle";
import SearchIcon from "../../assets/SearchBarIcon.png";
import { SearchBarIcon } from "../../styles/icon/IconStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchStoresApi } from "../../hooks/useSearchStoresApi";

export function SearchBar({ isMain }) {
	const [date, setDate] = useRecoilState(dateState);
	const [address, setAddress] = useRecoilState(addressState);
	const [isCalendarModal, setIsCalendarModal] = useRecoilState(isCalenderModalState);
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);
	const searchBarYear = useRecoilValue(searchBarYearState);
	const searchBarMonth = useRecoilValue(searchBarMonthState);
	const searchBarDay = useRecoilValue(searchBarDayState);
	const searchBarDayOfWeek = useRecoilValue(searchBarDayOfWeekState);
	const searchStoresApi = useSearchStoresApi();

	const navigate = useNavigate();
	const location = useLocation();

	const searchHandler = () => {
		if (searchBarDay && address !== "지역 선택") {
			searchStoresApi(address);

			if (location.pathname === "/") {
				navigate(
					`/search?address=${address}&year=${searchBarYear}&month=${searchBarMonth}&day=${searchBarDay}&dayOfWeek=${searchBarDayOfWeek}`
				);
			}
		}
	};

	const formatFirstAddress = firstAddress => {
		if (isMain && firstAddress.length > 12) {
			return firstAddress.slice(0, 12) + "...";
		} else if (firstAddress?.length > 15) {
			return firstAddress.slice(0, 15) + "...";
		}

		return firstAddress;
	};

	return (
		<SearchBarContainer>
			<SearchBarContent onClick={() => setIsCalendarModal(true)}>
				<Text size="13">
					{searchBarDay
						? `${searchBarYear}년 ${searchBarMonth}월 ${searchBarDay}일 ${searchBarDayOfWeek}요일`
						: date}
				</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent onClick={() => setIsSearchStoreModal(true)}>
				<Text size="13">{formatFirstAddress(address)}</Text>
			</SearchBarContent>
			{location.pathname === "/" && <SearchBarIcon src={SearchIcon} onClick={searchHandler} />}
		</SearchBarContainer>
	);
}
