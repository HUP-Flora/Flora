import { BlankSection } from "../../styles/common/CommonStyle";
import { StoreListSection } from "../../styles/map/MapStyle";
import { stores } from "../map/dummydata";
import { StoreCard } from "./StoreCard";

export function StoreList() {
	return (
		<StoreListSection>
			{stores.map(store => (
				<StoreCard {...store} key={store.sId} />
			))}
			<BlankSection height="56" />
		</StoreListSection>
	);
}
