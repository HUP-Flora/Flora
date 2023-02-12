import { useNavigate } from "react-router-dom";

import api from "../utils/api";

export const useReviewAddApi = () => {
	const navigate = useNavigate();

	const reviewAddApi = data => {
		api({
			method: "POST",
			url: "/reviews",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data,
		})
			.then(response => {
				console.log(response);
				navigate(`/mypage/review/list`);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return reviewAddApi;
};
