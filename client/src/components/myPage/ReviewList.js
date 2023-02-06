import React from "react";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";
import { ReviewsContainer } from "../../styles/myPage/ReviewListStyle";

import image from "../../assets/store.png";

function ReviewList(props) {
	// 더미 데이터
	const review = [
		{
			image: { image },
			name: "꽃 파는 가게",
			date: "2023.01.20",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		},
		{
			image: { image },
			name: "꽃 파는 가게",
			date: "2023.01.20",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		},
		{
			image: { image },
			name: "꽃 파는 가게",
			date: "2023.01.20",
			time: "17:03",
			content:
				"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem",
		},
	];

	return (
		<ReviewsContainer>
			{review.map((review, index) => (
				<ShadowCardWrapper>
					<ShadowCard marginBottom="16" display="flex" isSpaceBetween={true}>
						{/* left */}
						<div>
							{/* top */}
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
						{/* right */}
						<div>
							<img src={review.image.image} />
						</div>
					</ShadowCard>
				</ShadowCardWrapper>
			))}
		</ReviewsContainer>
	);
}

export default ReviewList;
