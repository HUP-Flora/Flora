import { useRecoilState } from "recoil";
import { storeHolidayState } from "../../recoil/signup";
import {
	BoldText,
	ChooseHolidaySection,
	HolidayCircle,
	HolidayCircleText,
} from "../../styles/common/CommonStyle";

export function ChooseHoliday() {
	const [storeHoliday, setStoreHoliday] = useRecoilState(storeHolidayState);

	const days = ["월", "화", "수", "목", "금", "토", "일"];

	const toggleHoliday = indexHoliday => {
		setStoreHoliday(
			storeHoliday.map((day, index) => {
				if (index === indexHoliday) {
					return !day;
				}
				return day;
			})
		);
	};

	return (
		<ChooseHolidaySection>
			{storeHoliday.map((day, index) => (
				<HolidayCircle key={index} isClicked={day} onClick={() => toggleHoliday(index)}>
					<BoldText size="13">
						<HolidayCircleText>{days[index]}</HolidayCircleText>
					</BoldText>
				</HolidayCircle>
			))}
		</ChooseHolidaySection>
	);
}
