import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { reviewsState } from "../../recoil/review";

import { useReviewsApi } from "../../hooks/useReviewsApi";

import MyPageListEmpty from "./MyPageListEmpty";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";

import defaultImg from "../../assets/default-flower.png";

function ReviewList({ size }) {
	const [reviews, setReviews] = useRecoilState(reviewsState);

	return (
		<div>
			{reviews.length === 0 ? (
				<MyPageListEmpty text="등록된 리뷰가" />
			) : (
				reviews.slice(0, size).map((review, index) => (
					<ShadowCardWrapper key={`${review.name}-${index}`}>
						<ShadowCard marginBottom="16" display="flex" isSpaceBetween={true}>
							<div>
								<HeaderContainer>
									<BoldText>{review?.name}</BoldText>
									<div>
										<GrayText size="13" weight="bold">
											{review?.createDate?.replace("T", " ")}
											{console.log(review?.createDate?.replace("T", " "))}
										</GrayText>
										{/* <GrayText size="13" weight="bold">
											{review?.time}
										</GrayText> */}
									</div>
								</HeaderContainer>
								<div>{review?.content}</div>
							</div>
							<div>
								<img
									src={review?.rimg?.split("-")[10] === "null.png" ? defaultImg : review?.rimg}
									alt="review-img"
								/>
							</div>
						</ShadowCard>
					</ShadowCardWrapper>
				))
			)}
		</div>
	);
}

export default ReviewList;
