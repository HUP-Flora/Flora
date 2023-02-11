import React from "react";

import StatusBar from "../../components/common/StatusBar";
import ReviewList from "../../components/myPage/ReviewList";
import { Container } from "../../styles/myPage/ListDetailStyle";

function Review(props) {
	return (
		<>
			<StatusBar text="리뷰 목록" />
			<Container>
				<ReviewList size={5} />
			</Container>
		</>
	);
}

export default Review;
