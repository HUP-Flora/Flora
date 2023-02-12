import api from "../utils/api";

import { useRecoilState } from "recoil";
import { storeState } from "../recoil/storeDetail";

export const useFloMarkDeleteApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const floMarkDelete = async sId => {
		await api({
			method: "DELETE",
			url: `/flowermarks/${sId}`,
		})
			.then(sId => {
				setStore({
					...store,
					bookmarkCnt: store?.bookmarkCnt - 1,
				});
			})
			.catch(error => {
				console.log("꽃갈피 삭제 에러", error);
			});
	};

	return floMarkDelete;
};
