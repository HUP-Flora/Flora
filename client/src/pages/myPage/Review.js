import React, { useEffect } from "react";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";

import { useReviewsApi } from "../../hooks/useReviewsApi";

import StatusBar from "../../components/common/StatusBar";
import ReviewList from "../../components/myPage/ReviewList";
import { Container } from "../../styles/myPage/ListDetailStyle";

function Review(props) {
	const reviewsApi = useReviewsApi();

	useEffect(() => {
		reviewsApi();
	}, []);

	return (
		<>
			<NoPaddingStatusBar text="리뷰 목록" />
			<Container>
				<ReviewList />
			</Container>
		</>
	);
}

export default Review;
