import { useParams } from "react-router";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import StatusBar from "../../components/common/StatusBar";
import { StoreForm } from "../../components/form/StoreForm";
import { WhiteLayout } from "../../styles/common/CommonStyle";

export function StoreEdit() {
	const { sId } = useParams();
	return (
		<>
			<NoPaddingStatusBar text="꽃집 정보 수정" />
			<WhiteLayout>
				<StoreForm nextURL={-1} sId={sId} type="edit" />
			</WhiteLayout>
		</>
	);
}
