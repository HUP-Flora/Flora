import React from "react";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";

import StatusBar from "../../components/common/StatusBar";
import ReviewList from "../../components/myPage/ReviewList";
import { Container } from "../../styles/myPage/ListDetailStyle";

function Review(props) {
	return (
		<>
			<NoPaddingStatusBar text="리뷰 목록" />
			<Container>
				<ReviewList size={5} />
			</Container>
		</>
	);
}

export default Review;
