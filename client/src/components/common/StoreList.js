import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { storeListState } from "../../recoil/search";
import { BlankSection, Text } from "../../styles/common/CommonStyle";
import { SearchListCenterFrame } from "../../styles/common/FrameStyle";
import { Gray50Container } from "../../styles/container/ContainerStyle";
import { BigSearchAddressIcon } from "../../styles/icon/IconStyle";
import { StoreListSection } from "../../styles/map/MapStyle";
import { stores } from "../map/dummydata";
import { StoreCard } from "./StoreCard";
import SearchAddressImage from "../../assets/chatting/SearchAddressImage.png";

export function StoreList() {
	const storeList = useRecoilValue(storeListState);
	return (
		<StoreListSection>
			{storeList.length === 0 ? (
				<SearchListCenterFrame>
					<BigSearchAddressIcon size="60" src={SearchAddressImage} />
					<Text>검색 결과가 존재하지 않습니다.</Text>
				</SearchListCenterFrame>
			) : (
				<>
					{storeList.map(store => (
						<StoreCard {...store} key={store.sid} />
					))}
					<BlankSection height="56" />
				</>
			)}
		</StoreListSection>
	);
}
