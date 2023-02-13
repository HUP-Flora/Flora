import api from "../utils/api";

import { useRecoilState } from "recoil";
import { reservationsState } from "../recoil/reservations";

export const useReservationConfirmApi = () => {
	const [reservations, setReservations] = useRecoilState(reservationsState);

	const confirmReservationsApi = async (type, page, size) => {
		let url = "";
		if (type === "CUSTOMER") {
			url = `/flolive/confirm/users?page=${page}&size=${size}`;
		} else if (type === "STORE") {
			url = `/flolive/confirm/stores?page=${page}&size=${size}`;
		}

		await api({
			method: "GET",
			url: url,
		})
			.then(response => {
				console.log("확정", response.data.content);
				setReservations(response.data.content);
			})
			.catch(error => {
				console.log("예약 확정 탭 에러", error);
			});
	};

	return confirmReservationsApi;
};
