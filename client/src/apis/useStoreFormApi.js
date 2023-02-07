import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../recoil/signup";

export const useStoreFormApi = () => {
	const token = useRecoilValue(accessTokenState);
	const storeFormApi = formData => {
		for (let key of formData.keys()) {
			console.log(key);
		}

		for (let value of formData.values()) {
			console.log(value);
		}
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_SERVER_URL}/auth/stores`,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return storeFormApi;
};
