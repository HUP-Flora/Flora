import React, { useEffect, useState } from "react";

import { SetRecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { nameState, productState } from "../../recoil/productForms";

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
	PictureWrapper,
} from "../../styles/product/productForm/ProductFormStyle";
import { GrayText, ValidText } from "../../styles/common/CommonStyle";
import { priceComma } from "../../hooks/priceComma";

function ProductForm({
	// name,
	// setName,
	// price,
	// setPrice,
	// description,
	// setDescription,
	nameValidMessage,
	priceValidMessage,
	descriptionValidMessage,
	pictureValidMessage,
}) {
	const [product, setProduct] = useRecoilState(productState);
	const resetProduct = useResetRecoilState(productState);

	const [nameCount, setNameCount] = useState(0);
	const [descriptionCount, setDescriptionCount] = useState(0);

	const handleChangeNameValue = e => {
		setProduct({ ...product, name: e.target.value });
		setNameCount(e.target.value.length);
	};

	const handleChangePriceValue = e => {
		// 천 단위로 콤마(,)
		setProduct({
			...product,
			price: priceComma(e.target.value)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		});
	};

	const handleChangeDescriptionValue = e => {
		setProduct({
			...product,
			desc: e.target.value,
		});
		setDescriptionCount(e.target.value.length);
	};

	// useEffect(() => {

	// 	resetProduct();
	// 	setProduct({
	// 		...product,
	// 		name: "왜 안돼",
	// 	});
	// }, []);

	return (
		<>
			<PictureWrapper>
				<UploadPictureWrapper isError={pictureValidMessage}>
					{/* {console.log(product?.pimg)} */}
					<UploadPicture img={product?.pimg} />
				</UploadPictureWrapper>
				{pictureValidMessage && (
					<ValidTextWrapper>
						<ValidText>{pictureValidMessage}</ValidText>
					</ValidTextWrapper>
				)}
			</PictureWrapper>
			<FormWrapper>
				<InputWrapper>
					<BottomBorderInput
						type="text"
						placeholder="상품명을 입력해주세요."
						maxLength={50}
						onChange={handleChangeNameValue}
						value={product?.name}
					/>
					{nameValidMessage && (
						<ValidTextWrapper>
							<ValidText>{nameValidMessage}</ValidText>
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
							// value={priceComma(product?.price)}
							value={product?.price}
							// value={product?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						/>
						<p>원</p>
					</div>
					{priceValidMessage && <ValidText>{priceValidMessage}</ValidText>}
				</InputWrapper>
				<InputWrapper>
					<BorderTextAreaAuto
						minRows={5}
						placeholder="상품 상세 설명을 입력해주세요."
						maxLength={500}
						onChange={handleChangeDescriptionValue}
						value={product?.desc}
					/>
					<TextLimit>
						<GrayText size="11">{descriptionCount} / 500자</GrayText>
					</TextLimit>
					{descriptionValidMessage && (
						<ValidTextWrapper>
							<ValidText>{descriptionValidMessage}</ValidText>
						</ValidTextWrapper>
					)}
				</InputWrapper>
			</FormWrapper>
		</>
	);
}

export default ProductForm;
