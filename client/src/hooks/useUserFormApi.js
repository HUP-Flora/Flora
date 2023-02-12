import api from "../utils/api";
import { useGetUserTypeApi } from "./useGetUserTypeApi";

export const useUserFormApi = () => {
	const getUserTypeApi = useGetUserTypeApi();

	const userFormApi = data => {
		api({
			method: "PUT",
			url: `auth/users`,
			data,
		})
			.then(response => {
				localStorage.setItem("AccessToken", response.data);
				getUserTypeApi(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return userFormApi;
};
