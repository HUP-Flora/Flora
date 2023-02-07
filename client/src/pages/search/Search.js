import { StatusBar } from "../../components/common/StatusBar";
import { KakaoMap } from "../../components/map/KakaoMap";
import { BlankSection, WhiteLayout } from "../../styles/common/CommonStyle";
import { ArrowSection, StoreListBottomSheet } from "../../styles/map/MapStyle";
import topArrow from "../../assets/arrow/TopArrow.png";
import bottomArrow from "../../assets/arrow/BottomArrow.png";
import { StoreList } from "../../components/common/StoreList";
import { SearchBar } from "../../components/common/SearchBar";
import { ArrowImage } from "../../styles/icon/IconStyle";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDaumPostShowState } from "../../recoil/chatting";
import PostcodeModal from "../../components/common/PostcodeModal";
import { isCalenderModalState } from "../../recoil/search";
import CalendarModal from "./CalendarModal";

export function Search() {
	const [storeListLargeMode, setStoreListLargeMode] = useState(false);
	const [isDaumPostShow, setIsDaumPostShow] = useRecoilState(isDaumPostShowState);
	const isCalendarModal = useRecoilValue(isCalenderModalState);
	return (
		<>
			{isDaumPostShow && <PostcodeModal />}
			{isCalendarModal && <CalendarModal />}
			<WhiteLayout>
				<StatusBar padding="16" text="꽃집 검색" />
			</WhiteLayout>
			<SearchBar />
			<KakaoMap />
			<StoreListBottomSheet isLarge={storeListLargeMode}>
				<ArrowSection>
					<ArrowImage
						src={storeListLargeMode ? bottomArrow : topArrow}
						alt="arrow"
						onClick={() => {
							setStoreListLargeMode(!storeListLargeMode);
						}}
					/>
				</ArrowSection>
				<StoreList />
			</StoreListBottomSheet>
		</>
	);
}
