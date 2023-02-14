import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";
import StatusBar from "../../components/common/StatusBar";
import { StoreForm } from "../../components/form/StoreForm";
import { WhiteLayout } from "../../styles/common/CommonStyle";

export function SignupOwnerStore() {
	return (
		<>
			<NoPaddingStatusBar text="꽃집 등록" />
			<WhiteLayout>
				<StoreForm nextURL={"/"} />
			</WhiteLayout>
		</>
	);
}
