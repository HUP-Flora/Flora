import { useSetRecoilState } from "recoil";
import { storeListState } from "../recoil/search";
import api from "../utils/api";

export const useSearchStoresApi = () => {
	const setStoreList = useSetRecoilState(storeListState);

	const searchStoresApi = (address, dayOfWeek) => {
		api({
			method: "GET",
			url: `/stores?address=${address}&day=${dayOfWeek}`,
		})
			.then(response => {
				setStoreList(response.data.content);
			})
			.catch(error => {
				console.log("꽃집 검색", error);
			});
	};

	return searchStoresApi;
};
