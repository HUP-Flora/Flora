import React, { useEffect, useState } from "react";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";

import image from "../../assets/store.png";
import MyPageListEmpty from "./MyPageListEmpty";

function ReviewList(props) {
	// 더미 데이터
	const reviews = [
		// {
		// 	image: { image },
		// 	name: "꽃 파는 가게",
		// 	date: "2023.01.20",
		// 	time: "17:03",
		// 	content:
		// 		"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		// },
		// {
		// 	image: { image },
		// 	name: "꽃 파는 가게",
		// 	date: "2023.01.20",
		// 	time: "17:03",
		// 	content:
		// 		"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		// },
		// {
		// 	image: { image },
		// 	name: "꽃 파는 가게",
		// 	date: "2023.01.20",
		// 	time: "17:03",
		// 	content:
		// 		"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		// },
	];

	return (
		<div>
			{reviews.length === 0 ? (
				<MyPageListEmpty text="등록된 리뷰가" />
			) : (
				reviews.map((review, index) => (
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
				))
			)}
		</div>
	);
}

export default ReviewList;
