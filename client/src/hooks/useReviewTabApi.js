import api from "../utils/api";

import { useRecoilState } from "recoil";
import { storeReviewsState } from "../recoil/storeDetail";
export const useReviewTabApi = () => {
	const [reviews, setReviews] = useRecoilState(storeReviewsState);

	const reviewsApi = async sId => {
		await api({
			method: "GET",
			url: `/reviews/stores/${sId}`,
		})
			.then(response => {
				setReviews(response.data.content);
			})
			.catch(error => console.log("리뷰 정보 에러", error));
	};

	return reviewsApi;
};
