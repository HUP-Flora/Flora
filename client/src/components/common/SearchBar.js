import { useRecoilState, useRecoilValue } from "recoil";
import { isDaumPostShowState } from "../../recoil/chatting";
import {
	RorderDayOfWeekState,
	RorderDayState,
	RorderMonthState,
	RorderYearState,
} from "../../recoil/reservation";
import { isCalenderModalState, isSearchStoreModalState } from "../../recoil/search";
import { addressState, dateState } from "../../recoil/searchBar";
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
	const RorderYear = useRecoilValue(RorderYearState);
	const RorderMonth = useRecoilValue(RorderMonthState);
	const RorderDay = useRecoilValue(RorderDayState);
	const RorderDayOfWeek = useRecoilValue(RorderDayOfWeekState);
	const searchStoresApi = useSearchStoresApi();

	const navigate = useNavigate();
	const location = useLocation();

	const searchHandler = () => {
		if (RorderDay && address !== "지역 선택") {
			searchStoresApi(address);

			if (location.pathname === "/") {
				navigate("/search");
			}
		}
	};

	const formatFirstAddress = firstAddress => {
		if (isMain && firstAddress.length > 12) {
			return firstAddress.slice(0, 12) + "...";
		} else if (firstAddress.length > 15) {
			return firstAddress.slice(0, 15) + "...";
		}

		return firstAddress;
	};

	return (
		<SearchBarContainer>
			<SearchBarContent onClick={() => setIsCalendarModal(true)}>
				<Text size="13">
					{RorderDay
						? `${RorderYear}년 ${RorderMonth}월 ${RorderDay}일 ${RorderDayOfWeek}요일`
						: date}
				</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent onClick={() => setIsSearchStoreModal(true)}>
				<Text size="13">{formatFirstAddress(address)}</Text>
			</SearchBarContent>
			<SearchBarIcon src={SearchIcon} onClick={searchHandler} />
		</SearchBarContainer>
	);
}
