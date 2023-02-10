import api from "../utils/api";

export const useUserFormApi = () => {
	const userFormApi = data => {
		api({
			method: "PUT",
			url: `auth/users`,
			data,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return userFormApi;
};
