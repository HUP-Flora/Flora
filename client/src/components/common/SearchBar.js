import { useRecoilState } from "recoil";
import { isDaumPostShowState } from "../../recoil/chatting";
import { isCalenderModalState } from "../../recoil/search";
import { addressState, dateState } from "../../recoil/searchBar";
import { SearchBarContainer, SearchBarContent } from "../../styles/bar/BarStyle";
import { Text, GrayText } from "../../styles/common/CommonStyle";

export function SearchBar() {
	const [date, setDate] = useRecoilState(dateState);
	const [address, setAddress] = useRecoilState(addressState);
	const [isCalendarModal, setIsCalendarModal] = useRecoilState(isCalenderModalState);
	const [isDaumPostShow, setIsDaumPostShow] = useRecoilState(isDaumPostShowState);

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
				<Text size="13">{date}</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent onClick={() => setIsDaumPostShow(true)}>
				<Text size="13">{formatFirstAddress(address)}</Text>
			</SearchBarContent>
		</SearchBarContainer>
	);
}
