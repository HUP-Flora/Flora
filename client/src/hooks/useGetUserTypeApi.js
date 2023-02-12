import { useSetRecoilState } from "recoil";
import { ownersIdState, userTypeState } from "../recoil/userInfo";
import api from "../utils/api";

export const useGetUserTypeApi = () => {
	const setUserType = useSetRecoilState(userTypeState);
	const setOwnersIdState = useSetRecoilState(ownersIdState);

	const getUserTypeApi = token => {
		console.log(token);
		api({
			method: "GET",
			url: "/auth/role",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				console.log(response.data);
				setUserType(response.data.role);
				setOwnersIdState(response.data.role === "[[ROLE_STORE]]" ? response.data.sId : -1);
			})
			.catch(error => {
				console.log("유저타입에러", error);
			});
	};

	return getUserTypeApi;
};
