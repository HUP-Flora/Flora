import api from "../utils/api";

export const useSearchStoresApi = () => {
	const searchStoresApi = address => {
		api({
			method: "GET",
			url: `/stores?address=${address}`,
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
