import React, { useEffect, useState } from "react";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { storeState, storeReviewsState } from "../../recoil/storeDetail";

import { useReviewsApi } from "../../hooks/useStoreApi";

import StoreTabEmpty from "./StoreTabEmpty";

import {
	ReviewsContainer,
	ReviewContainer,
	LeftContainer,
	HeaderContainer,
	ImageWrapper,
	GrayHrWrapper,
} from "../../styles/storeDetail/StoreReviewTabStyle";
import { BoldText, GrayText, GrayHr } from "../../styles/common/CommonStyle";

import productImgSrc from "../../assets/store.png";

function StoreReview(props) {
	const store = useRecoilValue(storeState);
	const [reviews, setReviews] = useRecoilState(storeReviewsState);

	const reviewsApi = useReviewsApi();

	// 더미 데이터
	const sId = 8;

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
				reviews.map(review => (
					<>
						<ReviewContainer>
							<LeftContainer>
								<HeaderContainer>
									<BoldText right="16">{review?.name}</BoldText>
									<GrayText size="13" weight="bold" right="4">
										{review?.createDate}
									</GrayText>
									<GrayText size="13" weight="bold" right="4">
										{/* {review?.time} */}
									</GrayText>
								</HeaderContainer>
								<div>{review?.content}</div>
							</LeftContainer>
							<ImageWrapper>
								<img src={review?.rImg} alt="product-img" />
							</ImageWrapper>
						</ReviewContainer>
						<GrayHrWrapper>
							<GrayHr />
						</GrayHrWrapper>
					</>
				))
			)}
		</ReviewsContainer>
	);
}

export default StoreReview;
