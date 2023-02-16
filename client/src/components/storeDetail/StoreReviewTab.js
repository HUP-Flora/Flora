import React, { useEffect, useState } from "react";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { storeState, storeReviewsState } from "../../recoil/storeDetail";

import { useReviewTabApi } from "../../hooks/useReviewTabApi";

import StoreTabEmpty from "./StoreTabEmpty";

import {
	ReviewsContainer,
	ReviewContainer,
	LeftContainer,
	HeaderContainer,
	ImageWrapper,
	GrayHrWrapper,
} from "../../styles/storeDetail/StoreReviewTabStyle";
import { BoldText, GrayText, GrayHr, ShadowCard } from "../../styles/common/CommonStyle";

import productImgSrc from "../../assets/store.png";
import defaultFlower from "../../assets/default-flower.png";
import { ShadowCardWrapper } from "../../styles/myPage/MyPageOrderListStyle";

function StoreReview({ sId }) {
	const store = useRecoilValue(storeState);
	const [reviews, setReviews] = useRecoilState(storeReviewsState);

	const reviewsApi = useReviewTabApi();

	useEffect(() => {
		// 리뷰가 있을 때만 get 요청
		if (store?.reviewCnt > 0) {
			reviewsApi(sId);
		}
	}, []);

	return (
		<ReviewsContainer>
			{reviews.length === 0 ? (
				<StoreTabEmpty type="review" />
			) : (
				reviews.map((review, index) => (
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
									src={review?.rimg?.split("-")[10] === "null.png" ? defaultFlower : review?.rimg}
									alt="review-img"
								/>
							</div>
						</ShadowCard>
					</ShadowCardWrapper>

					// <div key={`${review.name}-${index}`}>
					// 	<ReviewContainer>
					// 		<LeftContainer>
					// 			<HeaderContainer>
					// 				<BoldText right="16">{review?.nickname}</BoldText>
					// 				<GrayText size="13" weight="bold" right="4">
					// 					{review?.createDate?.replace("T", " ")}
					// 				</GrayText>
					// 				<GrayText size="13" weight="bold" right="4">
					// 					{/* {review?.time} */}
					// 				</GrayText>
					// 			</HeaderContainer>
					// 			<div>{review?.content}</div>
					// 		</LeftContainer>
					// 		<ImageWrapper>
					// 			{/* <img src={review?.rimg ? review.rimg : defaultFlower} alt="product-img" /> */}
					// 			{console.log(review)}
					// 			<img
					// 				src={review?.rimg?.split("-")[10] === "null.png" ? defaultFlower : review?.rimg}
					// 				alt="review-img"
					// 			/>
					// 		</ImageWrapper>
					// 	</ReviewContainer>
					// 	<GrayHrWrapper>
					// 		<GrayHr />
					// 	</GrayHrWrapper>
					// </div>
				))
			)}
		</ReviewsContainer>
	);
}

export default StoreReview;
