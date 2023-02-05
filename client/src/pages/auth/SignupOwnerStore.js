import StatusBar from "../../components/common/StatusBar";
import { StoreForm } from "../../components/form/StoreForm";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { WhiteLayout } from "../../styles/common/CommonStyle";

export function SignupOwnerStore() {
	return (
		<>
			<StatusBar text="꽃집 등록" />
			<WhiteLayout>
				<StoreForm nextURL={"/"} />
			</WhiteLayout>
		</>
	);
}
