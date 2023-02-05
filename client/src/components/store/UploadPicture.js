import {
	ImageInput,
	PicturePreview,
	UploadButton,
	UploadPictureSection,
	PictureSection,
} from "../../styles/common/CommonStyle";
import EmptyPhoto from "../../assets/photo/Photo.png";
import PlusButton from "../../assets/photo/PlusButton.png";
import { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { storeImageFileState, storeImagePreviewState } from "../../recoil/signup";

export function UploadPicture() {
	const [imageFile, setImageFile] = useRecoilState(storeImageFileState);
	const [imagePreview, setImagePreview] = useRecoilState(storeImagePreviewState);
	const imageRef = useRef();

	const onUploadImage = useCallback(() => {
		const file = imageRef.current.files[0];
		const reader = new FileReader();
		setImageFile(file);
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
	}, []);

	const onUploadImageButtonClick = useCallback(() => {
		imageRef.current.click();
	}, []);

	return (
		<UploadPictureSection>
			<ImageInput type="file" accept="image/*" ref={imageRef} onChange={onUploadImage} />
			<PictureSection onClick={onUploadImageButtonClick}>
				<PicturePreview src={imagePreview ? imagePreview : EmptyPhoto} alt="photoPreview" />
				<UploadButton src={PlusButton} alt={PlusButton} />
			</PictureSection>
		</UploadPictureSection>
	);
}
