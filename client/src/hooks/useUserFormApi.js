import axios from "axios";

export const useUserFormApi = () => {
	const token = localStorage.getItem("AccessToken");
	const userFormApi = data => {
		console.log(data);
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/users`,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
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
