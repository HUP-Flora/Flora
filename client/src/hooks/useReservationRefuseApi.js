import api from "../utils/api";

export const useReservationRefuseApi = () => {
	const reservationRefuseApi = async oId => {
		await api({
			method: "PUT",
			url: `flolive/${oId}`,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("예약 거절 에러", error);
			});
	};

	return reservationRefuseApi;
};
