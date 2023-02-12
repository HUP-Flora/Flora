import api from "../utils/api";

export const useLogoutApi = () => {
	const logoutApi = () => {
		api({
			method: "GET",
			url: `/auth`,
		})
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log("로그아웃 에러", error);
			});
	};

	return logoutApi;
};
