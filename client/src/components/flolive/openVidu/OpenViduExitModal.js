import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PortalReactDom from "react-dom";

import GrayWarning from "../../../assets/flolive/gray-warning.png";

import {
	Container,
	Backdrop,
	FlexBox,
	Modal,
	ModalTitle,
	DoubleButtonContainer,
} from "../../../styles/common/modal/ModalStyle";
import { Primary400Button, Primary50Button } from "../../../styles/button/ButtonStyle";
import { ExitInfoContainer } from "../../../styles/flolive/OpenViduExitModalStyle";
import { useFloliveExitApi } from "../../../hooks/useFloliveExitApi";

function OpenViduExitModal({ setIsModalShow }) {
	const navigate = useNavigate();

	let { oId } = useParams();

	const floliveExitApi = useFloliveExitApi();

	const toggleModal = () => {
		setIsModalShow(false);
	};

	const handleClickExit = () => {
		floliveExitApi(oId);
		navigate("/");
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={toggleModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<Container>
					<Modal paddingRow="16" marginLeft="-140">
						<FlexBox>
							<ModalTitle>정말로 종료하시겠습니까?</ModalTitle>
						</FlexBox>
						<ExitInfoContainer>
							<div>
								<img src={GrayWarning} alt="warning-icon" />
								종료 시 방에 재접속하실 수 없으며
							</div>
							<div>이로 인한 불이익은 책임지지 않습니다.</div>
						</ExitInfoContainer>
						<DoubleButtonContainer>
							<Primary400Button onClick={handleClickExit}>네</Primary400Button>
							<Primary50Button onClick={() => setIsModalShow(false)}>아니오</Primary50Button>
						</DoubleButtonContainer>
					</Modal>
				</Container>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default OpenViduExitModal;
