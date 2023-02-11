import { useParams } from "react-router";
import StatusBar from "../../components/common/StatusBar";
import { StoreForm } from "../../components/form/StoreForm";
import { WhiteLayout } from "../../styles/common/CommonStyle";

export function StoreEdit() {
	const { storeId } = useParams();
	return (
		<>
			<StatusBar text="꽃집 정보 수정" />
			<WhiteLayout>
				<StoreForm nextURL={`/store/${storeId}/detail`} type="edit" />
			</WhiteLayout>
		</>
	);
}
