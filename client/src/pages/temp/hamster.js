import hamsterImg from "./8471-hamster-wheel-loading.gif";
import { useOrdersApi } from "../../hooks/useOrdersApi";
import useFloliveOwner from "../../hooks/useFloliveOwner";
import useOrderDetail from "../../hooks/useOrderDetail";
import Select from "react-select";

function Hamster() {
	const { getOrderDetail } = useOrdersApi();
	const { accepteFlolive } = useFloliveOwner();
	const { changeOrderStatusAPI } = useOrderDetail();

	const initOptions = [
		{ value: 18, label: "09:00 ~ 09:30" },
		{ value: 19, label: "09:30 ~ 10:00" },
		{ value: 20, label: "10:00 ~ 10:30" },
		{ value: 21, label: "10:30 ~ 11:00" },
		{ value: 22, label: "11:00 ~ 11:30" },
		{ value: 23, label: "11:30 ~ 12:00" },
		{ value: 24, label: "12:00 ~ 12:30" },
		{ value: 25, label: "12:30 ~ 13:00" },
		{ value: 26, label: "13:00 ~ 13:30" },
		{ value: 27, label: "13:30 ~ 14:00" },
		{ value: 28, label: "14:00 ~ 14:30" },
		{ value: 29, label: "14:30 ~ 15:00" },
		{ value: 30, label: "15:00 ~ 15:30" },
		{ value: 31, label: "15:30 ~ 16:00" },
		{ value: 32, label: "16:00 ~ 16:30" },
		{ value: 33, label: "16:30 ~ 17:00" },
		{ value: 34, label: "17:00 ~ 17:30" },
		{ value: 35, label: "17:30 ~ 18:00" },
	];




	const currentDate = new Date(); // 현재 날짜와 시간을 가져옴
	const currentHour = currentDate.getHours(); // 현재 시간(시)을 가져옴
	const currentMinute = currentDate.getMinutes(); // 현재 시간(분)을 가져옴

	// 현재 시간을 분 단위로 계산
	const currentTotalMinutes = currentHour * 60 + currentMinute;

	// initOptions 배열의 첫 번째 요소(09:00 ~ 09:30)의 value 값이 18이므로,
	// 현재 시간에서 9시(540분)를 빼고, 30분 간격으로 나눈 몫과 나머지를 계산하여
	// initOptions 배열의 요소와 일치하는 값을 구할 수 있음
	const currentValue = Math.floor((currentTotalMinutes - 540) / 30) + 18;

	const options = initOptions.filter((option) => option.value >= currentValue);

	// 보낼 날짜 가공
	const formatRorderMonth = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1;
	const formatRoderDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
	const date = currentDate.getFullYear() + "-" + formatRorderMonth + "-" + formatRoderDay;

	console.log(date);

	console.log("date >= 2023-02-17", date >= "2023-02-17");

	return (
		<>
			<Select
				options={options}
				styles={{
					control: provided => ({
						...provided,
						boxShadow: "none",
						border: "1px solid #ADB5BD",
						borderRadius: "10px",
						textAlign: "center",
						height: "48px",
					}),
				}}
				isSearchable={false}
			/>
			<img src={hamsterImg} alt="hamsterImg" style={{ width: "50%", height: "50%" }} />
			<button onClick={() => accepteFlolive(95)}>테스트</button>
		</>
	);
}

export default Hamster;
