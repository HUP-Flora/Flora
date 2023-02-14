import api from "../utils/api";

import { useRecoilState, useSetRecoilState } from "recoil";
import { isFloMarkClickedState } from "../recoil/storeDetail";

export const useIsFloMarkApi = () => {
	const setIsFloMarkClicked = useSetRecoilState(isFloMarkClickedState);

	const isFloMark = async sId => {
		await api({
			method: "GET",
			url: `/flowermarks/${sId}`,
		})
			.then(response => {
				setIsFloMarkClicked(response.data);
			})
			.catch(error => {
				console.log("꽃갈피 여부 에러", error);
			});
	};

	return isFloMark;
};
