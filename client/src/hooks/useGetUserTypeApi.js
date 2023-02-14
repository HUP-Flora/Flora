import { useSetRecoilState } from "recoil";
import { ownersIdState, userInfoTypeState } from "../recoil/userInfo";
import api from "../utils/api";

export const useGetUserTypeApi = () => {
	const setUserType = useSetRecoilState(userInfoTypeState);
	const setOwnersIdState = useSetRecoilState(ownersIdState);

	const getUserTypeApi = token => {
		api({
			method: "GET",
			url: "/auth/role",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				setUserType(response.data.role);
				setOwnersIdState(response.data.role === "STORE" ? response.data.sId : -1);
			})
			.catch(error => {
				console.log("유저타입에러", error);
			});
	};

	return getUserTypeApi;
};
