import { useRecoilState } from "recoil";
import { reservationsState } from "../recoil/reservations";
import api from "../utils/api";

export const useReservationRefuseApi = () => {
	const [reservations, setReservations] = useRecoilState(reservationsState);

	const reservationRefuseApi = async oId => {
		await api({
			method: "PUT",
			url: `/flolive/${oId}`,
		})
			.then(response => {
				console.log(response);
				setReservations(
					reservations.filter(reservation => {
						return reservation.oid !== oId;
					})
				);
			})
			.catch(error => {
				console.log("예약 거절 에러", error);
			});
	};

	return reservationRefuseApi;
};
