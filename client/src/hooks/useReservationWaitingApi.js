import api from "../utils/api";

import { useRecoilState } from "recoil";
import { reservationsState } from "../recoil/reservations";

export const useReservationWaitingApi = () => {
	const [reservations, setReservations] = useRecoilState(reservationsState);

	const waitingReservationsApi = async (type, page, size) => {
		let url = "";
		if (type === "CUSTOMER") {
			// url = `/flolive/wait/user?page=${page}&size=${size}`;
			url = `/flolive/wait/user`;
		} else if (type === "STORE") {
			// url = `/flolive/wait/stores?page=${page}&size=${size}`;
			url = `/flolive/wait/stores`;
		}

		await api({
			method: "GET",
			url: url,
		})
			.then(response => {
				console.log("대기", response.data.content);
				setReservations(response.data.content);
			})
			.catch(error => {
				console.log("예약 대기 에러", error);
			});
	};

	return waitingReservationsApi;
};
