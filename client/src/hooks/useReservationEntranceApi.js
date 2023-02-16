import api from "../utils/api";

export const useReservationEntranceApi = () => {
	const reservationEntranceApi = async conId => {
		await api({
			method: "GET",
			url: `/flolive/${conId}`,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("예약 입장 에러", error);
			});
	};

	return reservationEntranceApi;
};
