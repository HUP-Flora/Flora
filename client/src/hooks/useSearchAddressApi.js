import api from "../utils/api";

export const useSearchAddressApi = () => {
	const searchAddressApi = words => {
		api({
			method: "GET",
			url: `${process.env.REACT_APP_SERVER_URL}/api/stores/regions?word=${words}`,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("검색자동완성", error);
			});
	};

	return searchAddressApi;
};
