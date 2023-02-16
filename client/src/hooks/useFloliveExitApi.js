import api from "../utils/api";

export const useFloliveExitApi = () => {
	const floliveExitApi = oid => {
		api({
			method: "GET",
			url: `/flolive/close/${oid}`,
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log("종료 에러", error);
			});
	};

	return floliveExitApi;
};
