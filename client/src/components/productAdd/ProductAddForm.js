import React, { useState } from "react";

import { UploadPicture } from "../store/UploadPicture";

import {
	UploadPictureWrapper,
	InputWrapper,
	FormWrapper,
	TextLimit,
	BottomBorderInput,
	BorderTextArea,
} from "../../styles/product/productAdd/ProductAddFormStyle";
import { GrayText } from "../../styles/common/CommonStyle";

function ProductAddForm(props) {
	const [nameCount, setNameCount] = useState(0);
	const [descriptionCount, setDescriptionCount] = useState(0);

	const handleChangeNameValue = e => {
		setNameCount(e.target.value.length);
	};

	const handleChangeDescriptionValue = e => {
		setDescriptionCount(e.target.value.length);
	};

	return (
		<>
			<UploadPictureWrapper>
				<UploadPicture />
			</UploadPictureWrapper>
			<FormWrapper>
				<form>
					<InputWrapper>
						<BottomBorderInput
							type="text"
							placeholder="상품명을 입력해주세요."
							maxLength={50}
							onChange={handleChangeNameValue}
						/>
						<TextLimit>
							<GrayText size="11">{nameCount} / 50자</GrayText>
						</TextLimit>
					</InputWrapper>
					<InputWrapper>
						<BottomBorderInput type="text" placeholder="가격을 입력해주세요." />
						<p>원</p>
					</InputWrapper>
					<InputWrapper>
						<BorderTextArea
							rows={5}
							placeholder="상품 상세 설명을 입력해주세요."
							maxLength={500}
							onChange={handleChangeDescriptionValue}
						/>
						<TextLimit>
							<GrayText size="11">{descriptionCount} / 500자</GrayText>
						</TextLimit>
					</InputWrapper>
				</form>
			</FormWrapper>
		</>
	);
}

export default ProductAddForm;
