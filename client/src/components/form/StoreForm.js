import { ChooseHoliday } from "../store/ChooseHoliday";
import { StatusBar } from "../common/temp/StatusBar";
import { UploadPicture } from "../store/UploadPicture";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { BlankSection, BoldText } from "../../styles/common/CommonStyle";
import { ChooseWorkingTime } from "../common/ChooseWorkingTime";

export function StoreForm() {
	return (
		<form action="#">
			<StatusBar text="꽃집 등록" />
			<BlankSection height="39" />
			<UploadPicture />
			<BoldText top="40" bottom="8">
				가게명 입력
			</BoldText>
			<input />
			<BoldText top="32" bottom="8">
				전화번호 입력
			</BoldText>
			<input />
			<BoldText top="32" bottom="8">
				주소 입력
			</BoldText>
			<input />
			<BoldText top="32" bottom="8">
				설명글 입력
			</BoldText>
			<input />
			<BoldText top="56" bottom="16">
				운영 시간 설정
			</BoldText>
			<ChooseWorkingTime />
			<BoldText top="32" bottom="16">
				휴무일 설정
			</BoldText>
			<ChooseHoliday />
			<BlankSection height="104" />
			<ButtonToolBar>
				<Primary400LargeButton>가입 완료하기</Primary400LargeButton>
			</ButtonToolBar>
		</form>
	);
}
