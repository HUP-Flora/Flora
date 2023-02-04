import {
	StoreCardContainer,
	StoreCardImage,
	StoreCardImageSection,
	StoreCardTextContent,
	StoreCardTextContentAddress,
	StoreCardTextContentPhoneAndWorkingTime,
	StoreCardTextFloMarkSection,
	StoreCardTextSection,
	StoreCardTextTitle,
	StoreCardTextTitleSection,
} from "../../styles/card/CardStyle";
import { BoldText, GrayText, OnOff, Text } from "../../styles/common/CommonStyle";
import FloMark from "../../assets/tapIcon/FloMark.png";
import SelectedFloMark from "../../assets/tapIcon/SelectedFloMark.png";
import { FloMarkImage } from "../../styles/icon/IconStyle";
import { useNavigate } from "react-router";

export function StoreCard({
	sId,
	sName,
	sPhoneNumber,
	sSido,
	sGugun,
	sDong,
	sBookMarkCnt,
	sStartTime,
	sEndTime,
	sImage,
	sIsOn,
}) {
	const navigate = useNavigate();

	const handleClick = sId => {
		navigate(`/store/${sId}`);
	};
	return (
		<StoreCardContainer
			onClick={() => {
				handleClick(sId);
			}}
		>
			<StoreCardTextSection>
				<StoreCardTextTitle>
					<StoreCardTextTitleSection>
						<OnOff isOn={sIsOn}>{sIsOn ? "ON" : "OFF"}</OnOff>
						<BoldText>{sName}</BoldText>
					</StoreCardTextTitleSection>
					<StoreCardTextFloMarkSection>
						<FloMarkImage src={FloMark} alt="FloMark" />
						<GrayText size="13">&nbsp;{sBookMarkCnt}</GrayText>
					</StoreCardTextFloMarkSection>
				</StoreCardTextTitle>
				<StoreCardTextContent>
					<StoreCardTextContentAddress>
						<Text size="13">
							{sSido} {sGugun} {sDong}
						</Text>
					</StoreCardTextContentAddress>
					<StoreCardTextContentPhoneAndWorkingTime>
						<Text size="13">{sPhoneNumber}</Text>
						<GrayText size="13" left="8" right="8">
							|
						</GrayText>
						<Text size="13">
							{sStartTime} ~ {sEndTime}
						</Text>
					</StoreCardTextContentPhoneAndWorkingTime>
				</StoreCardTextContent>
			</StoreCardTextSection>
			<StoreCardImageSection>
				<StoreCardImage src={sImage} />
			</StoreCardImageSection>
		</StoreCardContainer>
	);
}
