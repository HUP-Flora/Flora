import api from "../utils/api";

import { useRecoilState } from "recoil";
import { storeState } from "../recoil/storeDetail";

export const useFloMarkAddApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const floMarkAdd = async sId => {
		await api({
			method: "POST",
			url: `/flowermarks/${sId}`,
		})
			.then(sId => {
				setStore({
					...store,
					bookmarkCnt: store?.bookmarkCnt + 1,
				});
			})
			.catch(error => {
				console.log("꽃갈피 추가 에러", error);
			});
	};

	return floMarkAdd;
};
