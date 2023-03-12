import { useCallback, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

// States
import { storeImageFileState, storeImagePreviewState } from "../../recoil/signup";

// Styles
import {
	ImageInput,
	PicturePreview,
	UploadButton,
	UploadPictureSection,
	PictureSection,
} from "../../styles/common/CommonStyle";

// Images
import EmptyPhoto from "../../assets/photo/Photo.png";
import PlusButton from "../../assets/photo/PlusButton.png";

export function UploadPicture() {
	const [imagePreview, setImagePreview] = useRecoilState(storeImagePreviewState);
	const setImageFile = useSetRecoilState(storeImageFileState);
	const imageRef = useRef();

	// // 기존 이미지 삽입
	// if (!imagePreview && img && img.img?.split("-")[10] !== "null.png") {
	// 	setImagePreview(img?.img);
	// }

	const onUploadImage = useCallback(() => {
		const file = imageRef.current.files[0];
		const reader = new FileReader();

		// 이미지 파일 저장
		setImageFile(file);

		// 이미지 미리보기 저장 (recoil 안쓰고 useState만으로 가능하지 않을까?)
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
	}, []);

	// 파일 불러오기
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
