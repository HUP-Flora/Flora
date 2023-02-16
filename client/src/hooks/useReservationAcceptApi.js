import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const useReservationAcceptApi = () => {
	const navigate = useNavigate();

	const reservationAcceptApi = async oId => {
		await api({
			method: "GET",
			url: `/flolive/${oId}`,
		})
			.then(response => {
				console.log(response.data);
				const sessionId = response.data.sessionId;
				navigate(`/flolive/${oId}/${sessionId}`);
			})
			.catch(error => {
				console.log("예약 수락 에러", error);
			});
	};

	return reservationAcceptApi;
};
