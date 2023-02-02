import {
	EmptyPictureImg,
	PictureSection,
	UploadButton,
	UploadPictureSection,
} from "../../styles/common/CommonStyle";
import Photo from "../../assets/photo/Photo.png";
import PlusButton from "../../assets/photo/PlusButton.png";

export function UploadPicture() {
	return (
		<UploadPictureSection>
			<PictureSection>
				<EmptyPictureImg src={Photo} alt={Photo} />
				<UploadButton src={PlusButton} alt={PlusButton} />
			</PictureSection>
		</UploadPictureSection>
	);
}
