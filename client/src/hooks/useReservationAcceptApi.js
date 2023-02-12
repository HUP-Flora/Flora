import api from "../utils/api";

export const useReservationAcceptApi = () => {
	const reservationAcceptApi = async oId => {
		await api({
			method: "GET",
			url: `flolive/${oId}`,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("예약 수락 에러", error);
			});
	};

	return reservationAcceptApi;
};
