import React from "react";
import { useNavigate } from "react-router-dom";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { ListContiner, ListHeader } from "../../styles/myPage/MyPageStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";

import image from "../../assets/store.png";

function MyPageReview(props) {
	const navegate = useNavigate();

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
		<ListContiner>
			<ListHeader>
				<BoldText size="19">리뷰 관리</BoldText>
				<GrayText onClick={() => navegate("review/list")} weight="bold">
					더보기
				</GrayText>
			</ListHeader>
			{review.map((review, index) => (
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
			))}
		</ListContiner>
	);
}

export default MyPageReview;
