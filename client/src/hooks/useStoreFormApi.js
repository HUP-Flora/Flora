import api from "../utils/api";

export const useStoreFormApi = () => {
	const storeFormApi = data => {
		api({
			method: "PUT",
			url: "/auth/stores",
			headers: {
				"Content-Type": "multipart/form-data",
			},
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
