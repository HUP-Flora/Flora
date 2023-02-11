import api from "../utils/api";
import { RorderHolidayState, RorderTimeAvailableState } from "../recoil/reservation";
import { useSetRecoilState } from "recoil";

function useReservation() {
	const setRorderHolidayState = useSetRecoilState(RorderHolidayState);
	const setRorderTimeAvailableState = useSetRecoilState(RorderTimeAvailableState);

	const getHolidayAPI = () => {
		console.log("getHolidayAPI");
		api({
			method: "GET",
			url: `flolive/calendar/8`,
		})
			.then(res => {
				console.log(res);
				// 응답으로 온 휴무일을 저장
				setRorderHolidayState(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getAvailableTimeAPI = selecteddate => {
		console.log(selecteddate);
		api({
			method: "GET",
			url: `flolive/8?date=${selecteddate}`,
		})
			.then(res => {
				console.log(res);
				// 응답으로 온 예약 가능 시간을 저장
				// setRorderTimeAvailableState(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return {
		getHolidayAPI,
		getAvailableTimeAPI,
	};
}

export default useReservation;
