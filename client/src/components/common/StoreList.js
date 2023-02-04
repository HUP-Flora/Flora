import { useNavigate } from "react-router-dom";
import { BlankSection } from "../../styles/common/CommonStyle";
import { StoreListSection } from "../../styles/map/MapStyle";
import { stores } from "../map/dummydata";
import { StoreCard } from "./StoreCard";

export function StoreList() {
	const navigate = useNavigate();

	const handleClick = store => {
		console.log(store);
		navigate("/store/1234");
	};

	return (
		<StoreListSection>
			{stores.map(store => (
				<StoreCard {...store} onClick={handleClick} />
			))}
			<BlankSection height="56" />
		</StoreListSection>
	);
}
