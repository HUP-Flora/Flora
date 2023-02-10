import api from "../utils/api";

export const useStoreFormApi = () => {
	const storeFormApi = data => {
		return api({
			method: "PUT",
			url: "/auth/stores",
			data,
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// const storeFormApi = data => {
	// 	axios({
	// 		method: "PUT",
	// 		url: `${process.env.REACT_APP_SERVER_URL}/auth/stores`,
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 		data,
	// 	})
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	return storeFormApi;
};
