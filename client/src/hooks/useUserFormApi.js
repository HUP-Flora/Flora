import api from "../utils/api";

export const useUserFormApi = () => {
	const userFormApi = data => {
		api({
			method: "PUT",
			url: `auth/users`,
			data,
		})
			.then(response => {
				localStorage.setItem("AccessToken", response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return userFormApi;
};
