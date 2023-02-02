import {
	BoldText,
	ChooseHolidaySection,
	HolidayCircle,
	HolidayCircleText,
} from "../../styles/common/CommonStyle";

export function ChooseHoliday() {
	const days = ["월", "화", "수", "목", "금", "토", "일"];

	return (
		<ChooseHolidaySection>
			{days.map(day => (
				<HolidayCircle key={day}>
					<BoldText size="13">
						<HolidayCircleText>{day}</HolidayCircleText>
					</BoldText>
				</HolidayCircle>
			))}
		</ChooseHolidaySection>
	);
}
