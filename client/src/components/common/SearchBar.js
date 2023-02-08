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

export function SearchBar() {
	const [date, setDate] = useRecoilState(dateState);
	const [address, setAddress] = useRecoilState(addressState);
	const [isCalendarModal, setIsCalendarModal] = useRecoilState(isCalenderModalState);
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);
	const RorderYear = useRecoilValue(RorderYearState);
	const RorderMonth = useRecoilValue(RorderMonthState);
	const RorderDay = useRecoilValue(RorderDayState);
	const RorderDayOfWeek = useRecoilValue(RorderDayOfWeekState);

	const formatFirstAddress = firstAddress => {
		if (firstAddress.length > 15) {
			return firstAddress.slice(0, 15) + "...";
		} else {
			return firstAddress;
		}
	};

	return (
		<SearchBarContainer>
			<SearchBarContent onClick={() => setIsCalendarModal(true)}>
				<Text size="13">
					{RorderYear
						? `${RorderYear}년 ${RorderMonth}월 ${RorderDay}일 ${RorderDayOfWeek}요일`
						: "날짜 선택"}
				</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent onClick={() => setIsSearchStoreModal(true)}>
				<Text size="13">{formatFirstAddress(address)}</Text>
			</SearchBarContent>
		</SearchBarContainer>
	);
}
