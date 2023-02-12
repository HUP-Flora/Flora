import api from "../utils/api";

export const useSignoutApi = () => {
	const signoutApi = () => {
		api({
			method: "PUT",
			url: "/auth",
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("회원탈퇴에러", error);
			});
	};

	return signoutApi;
};
