import api from "../utils/api";

export const useSearchStoreListApi = () => {
	const searchStoreListApi = () => {
		api({
			method: "GET",
			url: "/stores",
		});
	};

	return searchStoreListApi;
};
