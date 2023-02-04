import { useRecoilState } from "recoil";
import { addressState, dateState } from "../../recoil/searchBar";
import { SearchBarContainer, SearchBarContent } from "../../styles/bar/BarStyle";
import { Text, GrayText } from "../../styles/common/CommonStyle";

export function SearchBar() {
	const [date, setDate] = useRecoilState(dateState);
	const [address, setAddress] = useRecoilState(addressState);
	return (
		<SearchBarContainer>
			<SearchBarContent>
				<Text size="13">{date}</Text>
			</SearchBarContent>
			<GrayText size="13">|</GrayText>
			<SearchBarContent>
				<Text size="13">{address}</Text>
			</SearchBarContent>
		</SearchBarContainer>
	);
}
