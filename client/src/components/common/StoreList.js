import { useRecoilValue } from "recoil";
import { storeListState } from "../../recoil/search";
import { BlankSection } from "../../styles/common/CommonStyle";
import { StoreListSection } from "../../styles/map/MapStyle";
import { stores } from "../map/dummydata";
import { StoreCard } from "./StoreCard";

export function StoreList() {
	const storeList = useRecoilValue(storeListState);
	return (
		<StoreListSection>
			{storeList.map(store => (
				<StoreCard {...store} key={store.sid} />
			))}
			<BlankSection height="56" />
		</StoreListSection>
	);
}
