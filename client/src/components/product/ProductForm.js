import React, { useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import { UploadPicture } from "../store/UploadPicture";

import {
	UploadPictureWrapper,
	InputWrapper,
	FormWrapper,
	TextLimit,
	BottomBorderInput,
	BorderTextAreaAuto,
	ValidTextWrapper,
} from "../../styles/product/productForm/ProductFormStyle";
import { GrayText, ValidText } from "../../styles/common/CommonStyle";

function ProductAddForm({
	name,
	setName,
	price,
	setPrice,
	description,
	setDescription,
	isValidName,
	isValidPrice,
	isValidDescription,
}) {
	const [nameCount, setNameCount] = useState(0);
	const [descriptionCount, setDescriptionCount] = useState(0);

	const handleChangeNameValue = e => {
		setName(e.target.value);
		setNameCount(e.target.value.length);
	};

	const handleChangePriceValue = e => {
		setPrice(e.target.value);
	};

	const handleChangeDescriptionValue = e => {
		setDescription(e.target.value);
		setDescriptionCount(e.target.value.length);
	};

	return (
		<>
			<UploadPictureWrapper>
				<UploadPicture />
			</UploadPictureWrapper>
			<FormWrapper>
				<InputWrapper>
					<BottomBorderInput
						type="text"
						placeholder="상품명을 입력해주세요."
						maxLength={50}
						onChange={handleChangeNameValue}
						value={name}
					/>
					{!isValidName && (
						<ValidTextWrapper>
							<ValidText>상품명을 입력해주세요.</ValidText>
						</ValidTextWrapper>
					)}
					<TextLimit>
						<GrayText size="11">{nameCount} / 50자</GrayText>
					</TextLimit>
				</InputWrapper>
				<InputWrapper>
					<div>
						<BottomBorderInput
							type="text"
							placeholder="가격을 입력해주세요."
							onChange={handleChangePriceValue}
							value={price}
						/>
						<p>원</p>
					</div>
					{!isValidPrice && <ValidText>가격을 입력해주세요.</ValidText>}
				</InputWrapper>
				<InputWrapper>
					<BorderTextAreaAuto
						minRows={5}
						placeholder="상품 상세 설명을 입력해주세요."
						maxLength={500}
						onChange={handleChangeDescriptionValue}
						value={description}
					/>
					<TextLimit>
						<GrayText size="11">{descriptionCount} / 500자</GrayText>
					</TextLimit>
					{!isValidDescription && (
						<ValidTextWrapper>
							<ValidText>상품 상세 설명을 입력해주세요.</ValidText>
						</ValidTextWrapper>
					)}
				</InputWrapper>
			</FormWrapper>
		</>
	);
}

export default ProductAddForm;
