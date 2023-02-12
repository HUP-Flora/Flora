// 사용 안함

import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const useLogoutApi = () => {
	const navigate = useNavigate();

	const logoutApi = () => {
		api({
			method: "GET",
			url: `/auth/logout`,
		})
			.then(res => {
				console.log("로그아웃 완료", res);
			})
			.catch(error => {
				console.log("로그아웃 에러", error);
			});
	};

	return logoutApi;
};
