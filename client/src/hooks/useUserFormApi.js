import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../recoil/signup";

export const useUserFormApi = () => {
	const token = useRecoilValue(accessTokenState);
	const userFormApi = data => {
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_SERVER_URL}/api/auth/users`,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			data,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return userFormApi;
};
