import api from "../utils/api";

import { useSetRecoilState } from "recoil";
import { storeState } from "../recoil/storeDetail";

export const useStoreInfoApi = () => {
	const setStore = useSetRecoilState(storeState);

	const storeInfo = sId => {
		api({
			method: "GET",
			url: `/stores/${sId}`,
		})
			.then(response => {
				setStore(response.data);
			})
			.catch(error => console.log("가게 정보 에러", error));
	};

	return storeInfo;
};
