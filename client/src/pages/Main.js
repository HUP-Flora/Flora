import { TabMenuBar } from "../components/common/TabMenuBar";
import { SearchBar } from "../components/common/SearchBar";

export function Main() {
	return (
		<>
			<SearchBar isMain={true} />
			<TabMenuBar isOwner="true" selectedMenu="Main" />
		</>
	);
}
