import api from "../utils/api";
import { RorderHolidayState, RorderTimeAvailableState } from "../recoil/reservation";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function useReservation() {
	const setRorderHolidayState = useSetRecoilState(RorderHolidayState);
	const setRorderTimeAvailableState = useSetRecoilState(RorderTimeAvailableState);

	const navigate = useNavigate();

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

	const submitReservationAPI = (reserveData) => {
		api({
			method: "POST",
			url: "flolive/reserve",
			reserveData,
		})
			.then(res => {
				console.log(res);
				// 성공시 예약 완료 페이지로 이동
				// navigate("/reservation/complete");
			})
			.catch(err => {
				console.log(err);
			});
	}

	return {
		getHolidayAPI,
		getAvailableTimeAPI,
		submitReservationAPI,
	};
}

export default useReservation;
