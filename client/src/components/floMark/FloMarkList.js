import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { floMarksState } from "../../recoil/floMark";

import { useFloMarkApi } from "../../hooks/useFloMarkApi";

import {
	FloMarkListContianer,
	TextContainer,
	ShadowCardContent,
	RowContainer,
} from "../../styles/floMark/FloMarkListStyle";
import {
	EmptyContainer,
	BoldText,
	GrayText,
	ShadowCard,
	PointerText,
} from "../../styles/common/CommonStyle";

import defaultImg from "../../assets/default-store.png";

function FloMarkList(props) {
	const navigate = useNavigate();

	const [floMarks, setFlomarks] = useRecoilState(floMarksState);

	const flomarkApi = useFloMarkApi();

	useEffect(() => {
		flomarkApi(0, 5);
	}, []);

	const formatAddressName = addressName => {
		return addressName?.replace("/", " ");
	};

	return (
		<FloMarkListContianer>
			{floMarks.length === 0 ? (
				<EmptyContainer isFull={true} exceptHeight="198">
					등록된 꽃갈피가 없어요
				</EmptyContainer>
			) : (
				<>
					{floMarks.map(floMark => (
						<ShadowCard
							key={floMark.sid}
							onClick={() => navigate(`/store/${floMark?.sid}`)}
							marginBottom="16"
						>
							<ShadowCardContent>
								<div>
									<img
										src={floMark?.bimg === null ? defaultImg : floMark?.bimg}
										alt="floMarkName"
									/>
								</div>
								<TextContainer>
									<RowContainer>
										<BoldText>{floMark?.sname}</BoldText>
										<PointerText isBold={true} size="13" color="primary">
											가게 보기 &gt;
										</PointerText>
									</RowContainer>
									<GrayText size="13">{formatAddressName(floMark?.address_name)}</GrayText>
									<RowContainer>
										<GrayText size="13">
											{floMark?.start} ~ {floMark?.end}
										</GrayText>
										<GrayText size="13">|</GrayText>
										<GrayText size="13">{floMark?.phoneNumber}</GrayText>
									</RowContainer>
								</TextContainer>
							</ShadowCardContent>
						</ShadowCard>
					))}
				</>
			)}
		</FloMarkListContianer>
	);
}

export default FloMarkList;
