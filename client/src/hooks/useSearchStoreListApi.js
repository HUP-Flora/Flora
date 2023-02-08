import axios from "axios";

export const useSearchStoreListApi = () => {
	const searchStoreListApi = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_SERVER_URL}/auth/stores`,
		});
	};

	return searchStoreListApi;
};
