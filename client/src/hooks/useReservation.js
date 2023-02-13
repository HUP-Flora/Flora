import api from "../utils/api";
import { RorderHolidayState, RorderTimeAvailableState } from "../recoil/reservation";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function useReservation() {
	const setRorderHolidayState = useSetRecoilState(RorderHolidayState);
	const setRorderTimeAvailableState = useSetRecoilState(RorderTimeAvailableState);

	const navigate = useNavigate();

	const getHolidayAPI = useCallback((sId) => {
		// console.log("getHolidayAPI");
		api({
			method: "GET",
			url: `flolive/calendar/${sId}`,
		})
			.then(res => {
				// console.log(res);
				// 응답으로 온 휴무일을 저장
				setRorderHolidayState(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [setRorderHolidayState]);

	const getAvailableTimeAPI = useCallback((selecteddate, sId) => {
		// console.log(selecteddate);
		api({
			method: "GET",
			url: `flolive/time/${sId}?date=${selecteddate}`,
		})
			.then(res => {
				// console.log(res.data);
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
				// console.log(res);
				// 성공시 예약 완료 페이지로 이동
				const resData = res.data;
				navigate(`/store/${reserveData.sid}/product/${reserveData.pid}/reservation/complete`, {
					state: {
						resData,
					}
				});
			})
			.catch(err => {
				console.log("예약 완료 api 에러", err);
			});
	}, []);

	return {
		getHolidayAPI,
		getAvailableTimeAPI,
		submitReservationAPI,
	};
}

export default useReservation;
