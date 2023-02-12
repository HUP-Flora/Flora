import { useRecoilValue, useSetRecoilState } from "recoil";
import { RorderDayOfWeekState } from "../recoil/reservation";
import { storeListState } from "../recoil/search";
import api from "../utils/api";

export const useSearchStoresApi = () => {
	const setStoreList = useSetRecoilState(storeListState);
	const rorderDayOfWeek = useRecoilValue(RorderDayOfWeekState);

	const searchStoresApi = address => {
		api({
			method: "GET",
			url: `/stores?address=${address}&day=${rorderDayOfWeek}`,
		})
			.then(response => {
				console.log(response.data);
				setStoreList(response.data.content);
			})
			.catch(error => {
				console.log("꽃집 검색", error);
			});
	};

	return searchStoresApi;
};
