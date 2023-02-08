import axios from "axios";

export const useSearchStoresApi = () => {
	const searchStoresApi = words => {
		axios({
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
				console.log("꽃집 검색", error);
			});
	};

	return searchStoresApi;
};
