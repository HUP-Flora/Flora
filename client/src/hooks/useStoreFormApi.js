import axios from "axios";

export const useStoreFormApi = () => {
	const token = localStorage.getItem("flora-token");
	const storeFormApi = data => {
		// for (let key of formData.keys()) {
		// 	console.log(key);
		// }

		// for (let value of formData.values()) {
		// 	console.log(value);
		// }
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_SERVER_URL}/auth/stores`,
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

	return storeFormApi;
};
