import React, { useEffect, useState } from "react";

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
import StoreTabEmpty from "./StoreTabEmpty";
import axios from "axios";

function StoreReview(props) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		// const response = axios.get("reviews/stores/{sId}?page=&size=");
		const response = [
			{
				revId: 111111111,
				name: "닉네임",
				content: "lorem Ipsum lorem ipsum dolor sit amet",
				createDate: "23.01.19",
				img: { productImgSrc },
			},
			{
				revId: 111111111,
				name: "닉네임",
				content: "lorem Ipsum lorem ipsum dolor sit amet",
				createDate: "23.01.19",
				img: { productImgSrc },
			},
			{
				revId: 111111111,
				name: "닉네임",
				content: "lorem Ipsum lorem ipsum dolor sit amet",
				createDate: "23.01.19",
				img: { productImgSrc },
			},
		];

		// setReviews(response.data);
		setReviews(response);
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
										{/* {review.time} */}
									</GrayText>
								</HeaderContainer>
								<div>{review?.content}</div>
							</LeftContainer>
							<ImageWrapper>
								<img src={review.img.productImgSrc} alt="product-img" />
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
