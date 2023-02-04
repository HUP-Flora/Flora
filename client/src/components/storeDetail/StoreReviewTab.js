import React from "react";

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
	// 더미 데이터
	const reviews = [
		{
			nickname: "닉네임",
			date: "23.01.19",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore et dolore magna",
			img: { productImgSrc },
		},
		{
			nickname: "닉네임",
			date: "23.01.19",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore et dolore magna",
			img: { productImgSrc },
		},
		{
			nickname: "닉네임",
			date: "23.01.19",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore et dolore magna",
			img: { productImgSrc },
		},
		{
			nickname: "닉네임",
			date: "23.01.19",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore et dolore magna",
			img: { productImgSrc },
		},
	];

	return (
		<ReviewsContainer>
			{reviews.map(review => (
				<>
					<ReviewContainer>
						<LeftContainer>
							<HeaderContainer>
								<BoldText right="16">{review.nickname}</BoldText>
								<GrayText size="13" weight="bold" right="4">
									{review.date}
								</GrayText>
								<GrayText size="13" weight="bold" right="4">
									{review.time}
								</GrayText>
							</HeaderContainer>
							<div>{review.content}</div>
						</LeftContainer>
						<ImageWrapper>
							<img src={review.img.productImgSrc} alt="product-img" />
						</ImageWrapper>
					</ReviewContainer>
					<GrayHrWrapper>
						<GrayHr />
					</GrayHrWrapper>
				</>
			))}
		</ReviewsContainer>
	);
}

export default StoreReview;
