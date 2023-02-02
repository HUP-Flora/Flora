import { StatusBar } from "../components/common/StatusBar";
import { KakaoMap } from "../components/map/KakaoMap";
import { BlankSection, WhiteLayout } from "../styles/common/CommonStyle";

export function SearchStore() {
	return (
		<>
			<WhiteLayout>
				<StatusBar padding="16" text="꽃집 검색" />
			</WhiteLayout>
			<BlankSection height="64" />
			<KakaoMap />
		</>
	);
}
