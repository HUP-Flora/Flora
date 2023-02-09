import React, { useEffect, useState } from "react";

import { BoldText, GrayText, ShadowCard } from "../../styles/common/CommonStyle";
import { HeaderContainer, ShadowCardWrapper } from "../../styles/myPage/MyPageReveiwListStyle";

import image from "../../assets/store.png";
import MyPageListEmpty from "./MyPageListEmpty";
import axios from "axios";

function ReviewList(props) {
	// 더미 데이터
	const sId = "1111";
	// 더미 데이터 끝 --------------------

	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		// const response = axios.get(`/api/reviews/stores/${sId}?page=&size=`);

		const response = [
			{
				revId: "222222",
				name: "lorem",
				content:
					"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum",
				createDate: "22.22.22",
				rImg: { image },
			},
			{
				revId: "222222",
				name: "lorem",
				content:
					"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum",
				createDate: "22.22.22",
				rImg: { image },
			},
			{
				revId: "222222",
				name: "lorem",
				content:
					"lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum",
				createDate: "22.22.22",
				rImg: { image },
			},
		];

		setReviews(response);
	}, []);

	return (
		<div>
			{reviews.length === 0 ? (
				<MyPageListEmpty text="등록된 리뷰가" />
			) : (
				reviews.map(review => (
					<ShadowCardWrapper>
						<ShadowCard marginBottom="16" display="flex" isSpaceBetween={true}>
							<div>
								<HeaderContainer>
									<BoldText>{review?.name}</BoldText>
									<div>
										<GrayText size="13" weight="bold">
											{review?.createDate}
										</GrayText>
										<GrayText size="13" weight="bold">
											{review?.time}
										</GrayText>
									</div>
								</HeaderContainer>
								<div>{review?.content}</div>
							</div>
							<div>
								<img src={review?.rImg?.image} />
							</div>
						</ShadowCard>
					</ShadowCardWrapper>
				))
			)}
		</div>
	);
}

export default ReviewList;
