import api from "../utils/api";

import { useRecoilState } from "recoil";
import { reviewsState } from "../recoil/review";

export const useReviewsApi = () => {
	const [reviews, setReviews] = useRecoilState(reviewsState);

	const reviewsApi = size => {
		api({
			method: "GET",
			url: `/reviews/users`,
			// url: `/reviews/users?page=0&size=${size}`,
		})
			.then(response => {
				console.log(response.data.content);
				setReviews(response.data.content);
			})
			.catch(error => {
				console.log("리뷰 내역 에러", error);
			});
	};
	return reviewsApi;
};
