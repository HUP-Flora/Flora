import { useSetRecoilState } from "recoil";
import { ownersIdState, userTypeState } from "../recoil/userInfo";
import api from "../utils/api";

export const useGetUserTypeApi = () => {
	const setUserType = useSetRecoilState(userTypeState);
	const setOwnersIdState = useSetRecoilState(ownersIdState);

	const getUserTypeApi = () => {
		api({
			method: "GET",
			url: "/auth/role",
		}).then(response => {
			console.log(response.data.role);
			setUserType(response.data.role);
			setOwnersIdState(response.data.role === "[ROLE_OWNER]" ? response.data.sId : -1);
		});
	};

	return getUserTypeApi;
};
