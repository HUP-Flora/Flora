import React from "react";
import { useNavigate } from "react-router-dom";

import { BoldText, BottomRowDoubleButtonContainer, Text } from "../../styles/common/CommonStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";
import { Container } from "../../styles/flolive/FloliveExitStyle";

import Image from "../../assets/store.png";

function FloliveExitContainer(props) {
	const navigate = useNavigate();

	// 더미 데이터
	const store = { name: "꽃집이요", img: { Image } };

	return (
		<Container>
			<div>
				<div>
					<BoldText font="nexon" size="28" bottom="24">
						예약이 완료되었습니다.
					</BoldText>
					<Text font="nexon">
						플로라이브 확정 여부는
						<br />
						빠른 시간 내에 알려드릴게요!
					</Text>
				</div>
				<div>
					<img src={store.img.Image} alt="" />
					<BoldText size="19">꽃집이요</BoldText>
				</div>
				<BottomRowDoubleButtonContainer>
					<Primary400Button onClick={() => navigate("/reservation/list")}>
						예약 내역으로 이동하기
					</Primary400Button>
					<Primary50Button onClick={() => navigate("/")}>홈으로 이동하기</Primary50Button>
				</BottomRowDoubleButtonContainer>
			</div>
		</Container>
	);
}

export default FloliveExitContainer;
