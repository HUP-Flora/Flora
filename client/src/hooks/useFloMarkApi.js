import api from "../utils/api";

import { useRecoilState } from "recoil";
import { floMarksState } from "../recoil/floMark";

export const useFloMarkApi = () => {
	const [flomarks, setFlomarks] = useRecoilState(floMarksState);

	const floMarkApi = (page, size) => {
		api({
			method: "GET",
			url: `/flowermarks?page=${page}&size=${size}`,
		})
			.then(response => {
				setFlomarks(response.data.content);
			})
			.catch(error => {
				console.log("꽃갈피 목록 에러", error);
			});
	};

	return floMarkApi;
};
