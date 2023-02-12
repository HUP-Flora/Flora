import api from "../utils/api";

import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/mypage";

export const useMypageInfoApi = () => {
	const setUser = useSetRecoilState(userState);

	const infoApi = (type, sId) => {
		let url = "";

		if (type === "[[ROLE_CUSTOMER]]") {
			url = `/users`;
		} else {
			url = `/stores/mypage`;
		}

		api({
			method: "GET",
			url: url,
		})
			.then(res => {
				console.log(res.data);

				setUser(res.data);
			})
			.catch(error => {
				console.log("유저 기본 정보 에러", error);
			});
	};

	return infoApi;
};
