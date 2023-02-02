import {
	ImageInput,
	PicturePreview,
	UploadButton,
	UploadPictureSection,
	PictureSection,
} from "../../styles/common/CommonStyle";
import Photo from "../../assets/photo/Photo.png";
import PlusButton from "../../assets/photo/PlusButton.png";
import { useCallback, useRef, useState } from "react";

export function UploadPicture() {
	const [imgFile, setImgFile] = useState("");
	const imgRef = useRef();

	const onUploadImage = useCallback(() => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImgFile(reader.result);
		};
	}, []);

	const onUploadImageButtonClick = useCallback(() => {
		imgRef.current.click();
	}, []);

	return (
		<UploadPictureSection>
			<ImageInput type="file" accept="image/*" ref={imgRef} onChange={onUploadImage} />
			<PictureSection onClick={onUploadImageButtonClick}>
				<PicturePreview src={imgFile ? imgFile : Photo} alt="photoPreview" />
				<UploadButton src={PlusButton} alt={PlusButton} />
			</PictureSection>
		</UploadPictureSection>
	);
}
