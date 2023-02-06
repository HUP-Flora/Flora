import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ReviewList from "../../components/myPage/ReviewList";

function Review(props) {
	return (
		<>
			<StatusBar text="리뷰 목록"/>
			<ReviewList />
		</>
	);
}

export default Review;
