import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalReactDom from "react-dom";

import { useRecoilState } from "recoil";
import { storeImageFileState } from "../../recoil/signup";

import { useReviewAddApi } from "../../hooks/useReviewAddApi";

import { UploadPicture } from "../store/UploadPicture";

import { Container, FlexBox } from "../../styles/myPage/ReviewAddModalStyle";
import { Backdrop, Modal } from "../../styles/common/modal/ModalStyle";
import { Primary400Button } from "../../styles/button/ButtonStyle";
import {
	BorderTextAreaAuto,
	TextLimit,
	BorderTextArea,
} from "../../styles/product/productForm/ProductFormStyle";
import { BoldText, GrayText, ValidText } from "../../styles/common/CommonStyle";

function ReviewAddModal({ isModalShow, setIsModalShow, sId, oId }) {
	const [imageFile, setImageFile] = useRecoilState(storeImageFileState);

	const [description, setDescription] = useState("");
	const [isDescriptionValid, setIsDescriptionValid] = useState(true);

	const reviewAddApi = useReviewAddApi();

	const toggleModal = () => {
		setIsModalShow(!isModalShow);
	};

	const handleClickRevieAddCheck = () => {
		if (description === "") {
			setIsDescriptionValid(false);
		} else {
			const data = {
				store: sId,
				order: oId,
				content: description,
			};

			console.log(data)

			const formData = new FormData();

			if (imageFile === "") {
				const file = new File(["null"], "null.png", {});
				formData.append("file", file);
			} else {
				formData.append("file", imageFile);
			}

			formData.append("reviewReq", new Blob([JSON.stringify(data)], { type: "application/json" }));

			reviewAddApi(formData);
			setIsDescriptionValid(true);
		}
	};

	const handleChangeDescriptionValue = e => {
		setDescription(e.target.value);
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
							<UploadPicture />
							<div>
								<BoldText left="50">받으신 꽃은 어땠나요?</BoldText>
							</div>
						</FlexBox>
						<BorderTextArea
							rows={10}
							placeholder="내용을 입력해주세요."
							maxLength={500}
							onChange={handleChangeDescriptionValue}
							value={description}
						/>
						<TextLimit>
							<GrayText size="11">{description.length} / 500자</GrayText>
						</TextLimit>
						{!isDescriptionValid && <ValidText>내용을 입력해주세요.</ValidText>}
						<div>
							<Primary400Button onClick={handleClickRevieAddCheck}>리뷰 작성</Primary400Button>
						</div>
					</Modal>
				</Container>,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default ReviewAddModal;
