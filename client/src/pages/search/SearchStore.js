import {
	AddressList,
	BoldText,
	BottomBorderInput,
	EmptyAddressList,
	InputDiv,
	InputSection,
	SearchInput,
	Text,
} from "../../styles/common/CommonStyle";
import { SearchStoreContainer } from "../../styles/common/modal/ModalStyle";
import {
	AddressItem,
	BigMessageSendIcon,
	BigSearchAddressIcon,
	SearchIcon,
} from "../../styles/icon/IconStyle";
import { useState } from "react";
import { useSearchAddressApi } from "../../hooks/useSearchAddressApi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSearchStoreModalState, resultAddressListState } from "../../recoil/search";
import SearchAddressImage from "../../assets/chatting/SearchAddressImage.png";
import { useSearchStoresApi } from "../../hooks/useSearchStoresApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
	searchBarDayOfWeekState,
	addressState,
	searchBarDayState,
	searchBarMonthState,
	searchBarYearState,
} from "../../recoil/searchBar";

export function SearchStore() {
	const [words, setWords] = useState("");
	const setIsSearchStoreModal = useSetRecoilState(isSearchStoreModalState);
	const resultAddressList = useRecoilValue(resultAddressListState);
	const setAddress = useSetRecoilState(addressState);
	const searchBarYear = useRecoilValue(searchBarYearState);
	const searchBarMonth = useRecoilValue(searchBarMonthState);
	const searchBarDay = useRecoilValue(searchBarDayState);
	const searchBarDayOfWeek = useRecoilValue(searchBarDayOfWeekState);
	const searchAddressApi = useSearchAddressApi();
	const searchStoresApi = useSearchStoresApi();
	const [submitSearch, setSubmitSearch] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const searchHandler = () => {
		setSubmitSearch(true);
		searchAddressApi(words);
	};

	const searchStoresHandler = address => {
		// searchStoresApi(address);
		setIsSearchStoreModal(false);
	};

	const activeEnter = e => {
		if (e.key === "Enter") {
			searchHandler();
		}
	};

	const addressClickHandler = () => {};

	return (
		<SearchStoreContainer>
			<BoldText>원하시는 지역을 검색해주세요.</BoldText>
			<InputDiv>
				<SearchInput
					type="text"
					id="words"
					placeholder="&nbsp;&nbsp;지역 검색"
					onChange={e => {
						setWords(e.target.value);
					}}
					onKeyDown={e => activeEnter(e)}
					value={words}
				/>
				<SearchIcon src={SearchAddressImage} onClick={searchHandler} />
			</InputDiv>
			<AddressList>
				{submitSearch ? (
					resultAddressList.length !== 0 ? (
						resultAddressList.map(resultAddress => (
							<AddressItem
								key={resultAddress}
								top="8"
								bottom="8"
								onClick={() => {
									setAddress(resultAddress);
									searchStoresHandler(resultAddress);
									if (location.pathname === "/search") {
										navigate(
											`/search?address=${resultAddress}&year=${searchBarYear}&month=${searchBarMonth}&day=${searchBarDay}&dayOfWeek=${searchBarDayOfWeek}`
										);
									}
								}}
							>
								{resultAddress}
							</AddressItem>
						))
					) : (
						<EmptyAddressList>
							<BigSearchAddressIcon src={SearchAddressImage} />
							<Text size="13">검색 결과가 존재하지 않습니다.</Text>
						</EmptyAddressList>
					)
				) : (
					<></>
				)}
			</AddressList>
		</SearchStoreContainer>
	);
}
