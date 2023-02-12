import api from "../utils/api";

import { useRecoilState } from "recoil";
import { storeState } from "../recoil/storeDetail";

export const useToggleApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const toggle = () => {
		api({
			method: "POST",
			url: `/stores/onair`,
		})
			.then(() => {
				setStore({ ...store, isOnair: store.isOnair === "ON" ? "OFF" : "ON" });
			})
			.catch(error => {
				console.log("온오프 토글 에러", error);
			});
	};

	return toggle;
};
