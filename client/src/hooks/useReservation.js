import api from "../utils/api";
import { RorderHolidayState, RorderTimeAvailableState } from "../recoil/reservation";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function useReservation() {
	const setRorderHolidayState = useSetRecoilState(RorderHolidayState);
	const setRorderTimeAvailableState = useSetRecoilState(RorderTimeAvailableState);

	const navigate = useNavigate();

	const getHolidayAPI = useCallback(() => {
		console.log("getHolidayAPI");
		api({
			method: "GET",
			url: "flolive/calendar/8",
		})
			.then(res => {
				console.log(res);
				// 응답으로 온 휴무일을 저장
				setRorderHolidayState(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [setRorderHolidayState]);

	const getAvailableTimeAPI = useCallback(selecteddate => {
		console.log(selecteddate);
		api({
			method: "GET",
			url: `flolive/time/8?date=${selecteddate}`,
		})
			.then(res => {
				console.log(res.data);
				// 응답으로 온 예약 가능 시간을 저장
				setRorderTimeAvailableState(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [setRorderTimeAvailableState]);

	const submitReservationAPI = useCallback(reserveData => {
		api({
			method: "POST",
			url: "flolive/reserve",
			data: reserveData,
		})
			.then(res => {
				console.log(res);
				// 성공시 예약 완료 페이지로 이동
				navigate("/store/:sId/product/:pId/reservation/complete");
			})
			.catch(err => {
				console.log(err);
			});
	}, [navigate]);

	return {
		getHolidayAPI,
		getAvailableTimeAPI,
		submitReservationAPI,
	};
}

export default useReservation;
