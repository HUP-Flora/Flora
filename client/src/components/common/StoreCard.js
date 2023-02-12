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
import {
	BoldText,
	GrayText,
	OnOff,
	PaddingLeft16BoldText,
	Text,
} from "../../styles/common/CommonStyle";
import FloMark from "../../assets/tapIcon/FloMark.png";
import SelectedFloMark from "../../assets/tapIcon/SelectedFloMark.png";
import { FloMarkImage } from "../../styles/icon/IconStyle";
import { useNavigate } from "react-router";

export function StoreCard({
	sid,
	name,
	phoneNumber,
	address_name,
	bookmarkCnt,
	start,
	end,
	isOnair,
	simg,
}) {
	const navigate = useNavigate();

	const handleClick = sid => {
		navigate(`/store/${sid}`);
	};

	const formatStoreTitle = title => {
		if (title.length > 8) {
			return title.slice(0, 8) + "...";
		} else {
			return title;
		}
	};

	const formatAddressName = addressName => {
		return addressName.replace("/", " ");
	};

	return (
		<StoreCardContainer
			onClick={() => {
				handleClick(sid);
			}}
		>
			<StoreCardTextSection>
				<StoreCardTextTitle>
					<StoreCardTextTitleSection>
						<OnOff isOn={isOnair === "ON"}>{isOnair === "ON" ? "ON" : "OFF"}</OnOff>
						<PaddingLeft16BoldText>{formatStoreTitle(name)}</PaddingLeft16BoldText>
					</StoreCardTextTitleSection>
					<StoreCardTextFloMarkSection>
						<FloMarkImage src={FloMark} alt="FloMark" />
						<GrayText size="13">&nbsp;{bookmarkCnt}</GrayText>
					</StoreCardTextFloMarkSection>
				</StoreCardTextTitle>
				<StoreCardTextContent>
					<StoreCardTextContentAddress>
						<Text size="13">{formatAddressName(address_name)}</Text>
					</StoreCardTextContentAddress>
					<StoreCardTextContentPhoneAndWorkingTime>
						<Text size="13">{phoneNumber}</Text>
						<GrayText size="13" left="8" right="8">
							|
						</GrayText>
						<Text size="13">
							{start} ~ {end}
						</Text>
					</StoreCardTextContentPhoneAndWorkingTime>
				</StoreCardTextContent>
			</StoreCardTextSection>
			<StoreCardImageSection>
				<StoreCardImage src={simg} />
			</StoreCardImageSection>
		</StoreCardContainer>
	);
}
