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
import { useNavigate } from "react-router-dom";

export function SearchBar({ isMain }) {
	const [date, setDate] = useRecoilState(dateState);
	const [address, setAddress] = useRecoilState(addressState);
	const [isCalendarModal, setIsCalendarModal] = useRecoilState(isCalenderModalState);
	const [isSearchStoreModal, setIsSearchStoreModal] = useRecoilState(isSearchStoreModalState);
	const RorderYear = useRecoilValue(RorderYearState);
	const RorderMonth = useRecoilValue(RorderMonthState);
	const RorderDay = useRecoilValue(RorderDayState);
	const RorderDayOfWeek = useRecoilValue(RorderDayOfWeekState);

	const navigate = useNavigate();

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
				<Text size="13">{date}</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent onClick={() => setIsSearchStoreModal(true)}>
				<Text size="13">{formatFirstAddress(address)}</Text>
			</SearchBarContent>
			{isMain && (
				<SearchBarIcon
					src={SearchIcon}
					onClick={() => {
						navigate("/search");
					}}
				/>
			)}
		</SearchBarContainer>
	);
}
