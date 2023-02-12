import React from "react";
import { useNavigate } from "react-router-dom";
import PortalReactDom from "react-dom";

import { useProductDeleteApi } from "../../hooks/useProductDeleteApi";

import {
	Container,
	Backdrop,
	FlexBox,
	Modal,
	ModalTitle,
	DoubleButtonContainer,
} from "../../styles/common/modal/ModalStyle";
import { Primary400Button, Primary50Button } from "../../styles/button/ButtonStyle";

function ModalContainer({ isModalShow, setIsModalShow, pId, sId }) {
	const navigate = useNavigate();

	const productDeleteApi = useProductDeleteApi();

	const toggleModal = () => {
		setIsModalShow(!isModalShow);
	};

	const handleClickYes = () => {
		// (백) requset
		// navigate("/storeDetail");
		productDeleteApi(sId, pId);
	};

	return (
		<>
			{PortalReactDom.createPortal(
				<Backdrop onClick={toggleModal} />,
				document.getElementById("backdrop-root")
			)}
			{PortalReactDom.createPortal(
				<Container>
					<Modal>
						<FlexBox>
							<ModalTitle>정말로 삭제하시겠습니까?</ModalTitle>
						</FlexBox>
						<DoubleButtonContainer>
							<Primary400Button onClick={handleClickYes}>네</Primary400Button>
							<Primary50Button onClick={() => setIsModalShow(false)}>아니오</Primary50Button>
						</DoubleButtonContainer>
					</Modal>
				</Container>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default ModalContainer;
