import api from "../utils/api";

import { useRecoilState } from "recoil";
import { reservationsState } from "../recoil/reservations";

export const useReservationApi = () => {
	const [reservations, setReservations] = useRecoilState(reservationsState);

	const reservationApi = async (status, type, page, size) => {
		let url = "";
		if (type === "customer") {
			url = `/flolive/${status}/user?page=${page}&size=${size}`;
		} else if (type === "owner") {
			url = `/flolive/${status}/stores?page=${page}&size=${size}`;
		}

		await api({
			method: "GET",
			url: url,
		})
			.then(response => {
				console.log(status, response.data.content);
				setReservations(response.data.content);
			})
			.catch(error => {
				console.log(`예약 ${status} 에러`, error);
			});
	};

	return reservationApi;
};
