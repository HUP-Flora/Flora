import React from "react";
import { useNavigate } from "react-router-dom";

import {
	BoldText,
	GrayText,
	PointerGrayText,
	PointerText,
	ShadowCard,
} from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";

import image from "../../assets/store.png";
import ReviewList from "./ReviewList";

function MyPageReview(props) {
	const navigate = useNavigate();

	return (
		<ListContiner>
			<ListHeader>
				<BoldText size="19">리뷰 관리</BoldText>
				<PointerText color="gray" onClick={() => navigate("review/list")} weight="bold">
					더보기
				</PointerText>
			</ListHeader>
			<ReviewList size={3} />
			{/* {reviews.map((review, index) => (
				<ShadowCardWrapper>
					<ShadowCard marginBottom="16" display="flex" isSpaceBetween={true}>
						<div>
							<HeaderContainer>
								<BoldText>{review.name}</BoldText>
								<div>
									<GrayText size="13" weight="bold">
										{review.date}
									</GrayText>
									<GrayText size="13" weight="bold">
										{review.time}
									</GrayText>
								</div>
							</HeaderContainer>
							<div>{review.content}</div>
						</div>
						<div>
							<img src={review.image.image} />
						</div>
					</ShadowCard>
				</ShadowCardWrapper>
			))} */}
		</ListContiner>
	);
}

export default MyPageReview;
