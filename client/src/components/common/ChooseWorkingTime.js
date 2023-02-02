import Select from "react-select";
import { ChooseWorkingTimeSection, GrayText, Text } from "../../styles/common/CommonStyle";

export function ChooseWorkingTime() {
	const options = [
		{ value: 0, label: "00:00" },
		{ value: 1, label: "00:30" },
		{ value: 2, label: "01:00" },
		{ value: 3, label: "01:30" },
		{ value: 4, label: "02:00" },
		{ value: 5, label: "02:30" },
		{ value: 6, label: "03:00" },
		{ value: 7, label: "03:30" },
		{ value: 8, label: "04:00" },
		{ value: 9, label: "04:30" },
		{ value: 10, label: "05:00" },
		{ value: 11, label: "05:30" },
		{ value: 12, label: "06:00" },
		{ value: 13, label: "06:30" },
		{ value: 14, label: "07:00" },
		{ value: 15, label: "07:30" },
		{ value: 16, label: "08:00" },
		{ value: 17, label: "08:30" },
		{ value: 18, label: "09:00" },
		{ value: 19, label: "09:30" },
		{ value: 20, label: "10:00" },
		{ value: 21, label: "10:30" },
		{ value: 22, label: "11:00" },
		{ value: 23, label: "11:30" },
		{ value: 24, label: "12:00" },
		{ value: 25, label: "12:30" },
		{ value: 26, label: "13:00" },
		{ value: 27, label: "13:30" },
		{ value: 28, label: "14:00" },
		{ value: 29, label: "14:30" },
		{ value: 30, label: "15:00" },
		{ value: 31, label: "15:30" },
		{ value: 32, label: "16:00" },
		{ value: 33, label: "16:30" },
		{ value: 34, label: "17:00" },
		{ value: 35, label: "17:30" },
		{ value: 36, label: "18:00" },
		{ value: 37, label: "18:30" },
		{ value: 38, label: "19:00" },
		{ value: 39, label: "19:30" },
		{ value: 40, label: "20:00" },
		{ value: 41, label: "20:30" },
		{ value: 42, label: "21:00" },
		{ value: 43, label: "21:30" },
		{ value: 44, label: "22:00" },
		{ value: 45, label: "22:30" },
		{ value: 46, label: "23:00" },
		{ value: 47, label: "23:30" },
	];

	return (
		<ChooseWorkingTimeSection>
			<GrayText size="13">시작</GrayText>
			<Select
				options={options}
				isSearchable={false}
				isDisabled={false}
				placeholder="00:00"
			></Select>
			<Text size="16">~</Text>
			<GrayText size="13">종료</GrayText>
			<Select
				options={options}
				isSearchable={false}
				isDisabled={false}
				placeholder="00:00"
			></Select>
		</ChooseWorkingTimeSection>
	);
}
