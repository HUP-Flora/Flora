import { ChooseHoliday } from "../store/ChooseHoliday";
import { UploadPicture } from "../store/UploadPicture";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { BlankSection, BoldText } from "../../styles/common/CommonStyle";
import { ChooseWorkingTime } from "../common/ChooseWorkingTime";
import { useNavigate } from "react-router-dom";
import {
	SignupAddressContainerButton,
	SignupFirstAddressInput,
	SignupLabelDiv,
	SignupPhoneNumberInput,
	SignupSecondAddressInput,
	SignupTextInput,
	StoreDescription,
} from "../../styles/chatting/input/InputStyle";
import {
	ErrorMessage,
	InputCounter,
	InputCounterContainer,
	InputLabel,
	SearchAddressContainerButton,
} from "../../styles/chatting/Messages/Message/forms/OtherFormStyle";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	phoneNumberState,
	storeBrnState,
	storeDescriptionState,
	storeEndTimeState,
	storeFirstAddressState,
	storeHolidayState,
	storeImageFileState,
	storeImagePreviewState,
	storeNameState,
	storeRegionDepthNameState,
	storeSecondAddressState,
	storeStartTimeState,
} from "../../recoil/signup";
import PostcodeModal from "../common/PostcodeModal";
import { isDaumPostShowState } from "../../recoil/chatting";
import { StoreFormApi, useStoreFormApi } from "../../hooks/useStoreFormApi";
import { locationState } from "../../recoil/map";

export function StoreForm({ nextURL }) {
	const [storePhoneNumber, setStorePhoneNumber] = useRecoilState(phoneNumberState);
	const [storeName, setStoreName] = useRecoilState(storeNameState);
	const [storeDescription, setStoreDescription] = useRecoilState(storeDescriptionState);
	const [storeFirstAddress, setStoreFirstAddress] = useRecoilState(storeFirstAddressState);
	const [storeSecondAddress, setStoreSecondAddress] = useRecoilState(storeSecondAddressState);
	const [storeEndTime, setStoreEndTime] = useRecoilState(storeEndTimeState);
	const [storeHoliday, setStoreHoliday] = useRecoilState(storeHolidayState);
	const [location, setLocation] = useRecoilState(locationState);
	const [storeNameErrorMessage, setStoreNameErrorMessage] = useState("");
	const [storePhoneNumberErrorMessage, setStorePhoneNumberErrorMessage] = useState("");
	const [storeAddressErrorMessage, setStoreAddressErrorMessage] = useState("");
	const [isDaumPostShow, setIsDaumPostShow] = useRecoilState(isDaumPostShowState);

	const [storeStartTime, setStoreStartTime] = useRecoilState(storeStartTimeState);
	const [storeBrn, setStoreBrn] = useRecoilState(storeBrnState);
	const [storeImageFile, setStoreImageFile] = useRecoilState(storeImageFileState);
	const storeFormApi = useStoreFormApi();

	const storeRegionDepthName = useRecoilValue(storeRegionDepthNameState);

	const navigate = useNavigate();
	const handleStoreForm = e => {
		e.preventDefault();

		if (storeNameValidate(storeName) && phoneNumberValidate(storePhoneNumber)) {
			const storeHolidays = ["월", "화", "수", "목", "금", "토", "일"]
				.filter((_, index) => storeHoliday[index])
				.join();

			const data = {
				businessLicense: storeBrn,
				name: storeName,
				phoneNumber: storePhoneNumber,
				region_1depth_name: storeRegionDepthName.region_1depth_name,
				region_2depth_name: storeRegionDepthName.region_2depth_name,
				region_3depth_name: storeRegionDepthName.region_3depth_name,
				address_name: `${storeFirstAddress} ${storeSecondAddress}`,
				lat: location.center.lat,
				lng: location.center.lng,
				desc: storeDescription,
				holiday: storeHolidays,
				start: storeStartTime.value,
				end: storeEndTime.value,
			};

			// const formData = new FormData();
			// formData.append("thumbnail", storeImageFile);
			// formData.append("businessLicense", storeBrn);
			// formData.append("name", storeName);
			// formData.append("phoneNumber", storePhoneNumber);
			// // kebab case 바꾸기
			// formData.append("region_1depth_name", storeRegionDepthName.region_1depth_name);
			// formData.append("region_2depth_name", storeRegionDepthName.region_2depth_name);
			// formData.append("region_3depth_name", storeRegionDepthName.region_3depth_name);
			// formData.append("address_name", `${storeFirstAddress} ${storeSecondAddress}`);
			// formData.append("desc", storeDescription);
			// formData.append("holiday", storeHolidays);
			// formData.append("start", storeStartTime.value);
			// formData.append("end", storeEndTime.value);

			// storeFormApi(formData);
			storeFormApi(data);

			setStoreImageFile("");
			setStoreBrn("");
			setStoreName("");
			setStorePhoneNumber("");
			setStoreSecondAddress("");
			setStoreDescription("");
			setStoreHoliday("");
			setStoreStartTime({ value: 18, label: "09:00" });
			setStoreEndTime({ value: 36, label: "18:00" });

			navigate(nextURL);
		}
	};

	const storeNameHandler = useCallback(
		target => {
			const Sname = target.value;
			setStoreName(Sname);
			if (Sname) {
				storeNameValidate(Sname);
			}
		},
		[setStoreName]
	);

	const storeNameValidate = storeName => {
		if (!storeName.trim()) {
			setStoreNameErrorMessage("가게명을 입력해주세요.");
			return false;
		} else if (storeName.length > 50) {
			setStoreNameErrorMessage("가게명은 50자 이하여야 합니다.");
			return false;
		} else {
			setStoreNameErrorMessage("");
			return true;
		}
	};

	const phoneNumberHandler = useCallback(
		target => {
			target.value = target.value
				.replace(/[^0-9]/g, "")
				.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
				.replace(/(-{1,2})$/g, "");
			setStorePhoneNumberErrorMessage("");
			setStorePhoneNumber(target.value);
		},
		[setStorePhoneNumber]
	);

	const phoneNumberValidate = phoneNumber => {
		if (!phoneNumber.trim()) {
			setStorePhoneNumberErrorMessage("전화번호를 입력해주세요.");
			return false;
		} else if (phoneNumber.length < 12) {
			setStorePhoneNumberErrorMessage("잘못된 양식입니다. 다시 작성해주세요.");
			return false;
		} else {
			setStorePhoneNumberErrorMessage("");
			return true;
		}
	};

	const daumPostHandler = e => {
		setIsDaumPostShow(true);
	};

	const formatFirstAddress = firstAddress => {
		if (firstAddress.length > 25) {
			return firstAddress.slice(0, 25) + "...";
		} else {
			return firstAddress;
		}
	};

	return (
		<>
			{isDaumPostShow && <PostcodeModal />}
			<form action="#" onSubmit={handleStoreForm}>
				<BlankSection height="39" />
				<UploadPicture />
				<SignupLabelDiv>
					<InputLabel htmlFor="storeName">가게명 입력</InputLabel>
				</SignupLabelDiv>
				<SignupTextInput
					type="text"
					id="storeName"
					placeholder="&nbsp;&nbsp;가게명을 입력해주세요"
					onChange={e => {
						storeNameHandler(e.target);
					}}
					onBlur={e => {
						storeNameValidate(e.target.value);
					}}
					value={storeName}
					HasError={storeNameErrorMessage}
				/>
				<InputCounterContainer>
					{storeNameErrorMessage && <ErrorMessage>{storeNameErrorMessage}</ErrorMessage>}
					<InputCounter isError={storeNameErrorMessage}>{storeName.length}/50자</InputCounter>
				</InputCounterContainer>

				<SignupLabelDiv>
					<InputLabel htmlFor="phoneNumber">전화번호 입력</InputLabel>
				</SignupLabelDiv>
				<SignupPhoneNumberInput
					type="text"
					id="phoneNumber"
					maxLength="13"
					placeholder="&nbsp;&nbsp;- 없이 입력해주세요"
					onChange={e => {
						phoneNumberHandler(e.target);
					}}
					// onFocus={e => VsendUserPhoneChangeFalseIsTouched(e)}
					onBlur={e => {
						phoneNumberValidate(e.target.value);
					}}
					value={storePhoneNumber}
					HasError={storePhoneNumberErrorMessage}
				/>
				{storePhoneNumberErrorMessage && (
					<ErrorMessage>{storePhoneNumberErrorMessage}</ErrorMessage>
				)}

				<SignupLabelDiv>
					<InputLabel htmlFor="storeAddress">주소 입력</InputLabel>
				</SignupLabelDiv>
				<SignupAddressContainerButton type="button" onClick={e => daumPostHandler(e)}>
					<SignupFirstAddressInput
						type="text"
						id="storeAddress"
						placeholder="&nbsp;&nbsp;내용을 입력해주세요."
						disabled
						value={formatFirstAddress(storeFirstAddress)}
						HasError={storeAddressErrorMessage}
						// onClick={e => daumPostHandler(e)}
					/>
				</SignupAddressContainerButton>
				{storeAddressErrorMessage && <ErrorMessage>배송지를 입력해주세요.</ErrorMessage>}
				<SignupSecondAddressInput
					type="text"
					placeholder="&nbsp;&nbsp;상세 주소"
					onChange={e => setStoreSecondAddress(e.target.value)}
					value={storeSecondAddress}
				/>
				<SignupLabelDiv>
					<InputLabel htmlFor="storeDescription">설명글 입력</InputLabel>
				</SignupLabelDiv>
				<StoreDescription
					id="storeDescription"
					placeholder="내용을 입력해주세요."
					onChange={e => setStoreDescription(e.target.value)}
					value={storeDescription}
				/>
				<InputCounterContainer>
					<InputCounter>{storeDescription.length}/500자</InputCounter>
				</InputCounterContainer>
				<BoldText top="56" bottom="16">
					운영 시간 설정
				</BoldText>
				<ChooseWorkingTime />
				<BoldText top="32" bottom="16">
					휴무일 설정
				</BoldText>
				<ChooseHoliday />
				<BlankSection height="104" />
				<ButtonToolBar>
					<Primary400LargeButton onClick={handleStoreForm}>가입 완료하기</Primary400LargeButton>
				</ButtonToolBar>
			</form>
		</>
	);
}
