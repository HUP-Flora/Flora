import { ChooseHoliday } from "../store/ChooseHoliday";
import { UploadPicture } from "../store/UploadPicture";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { Primary400LargeButton, Primary50LargeButton } from "../../styles/button/ButtonStyle";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	isFocusedInputState,
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
import { useStoreInfoApi } from "../../hooks/useStoreInfoApi";
import { storeState } from "../../recoil/storeDetail";

export function StoreForm({ nextURL, type, sId }) {
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
	const setStoreImagePreview = useSetRecoilState(storeImagePreviewState);

	const [storeStartTime, setStoreStartTime] = useRecoilState(storeStartTimeState);
	const [storeBrn, setStoreBrn] = useRecoilState(storeBrnState);
	const [storeImageFile, setStoreImageFile] = useRecoilState(storeImageFileState);
	const [isFocusedInput, setIsFocusedInput] = useRecoilState(isFocusedInputState);
	const storeFormApi = useStoreFormApi();
	const inputRef = useRef([]);

	const [storeRegionDepthName, setStoreRegionDepthName] = useRecoilState(storeRegionDepthNameState);
	const store = useRecoilValue(storeState);

	const navigate = useNavigate();

	useEffect(() => {
		if (type === "edit") {
			const timeList = [
				"00:00",
				"00:30",
				"01:00",
				"01:30",
				"02:00",
				"02:30",
				"03:00",
				"03:30",
				"04:00",
				"04:30",
				"05:00",
				"05:30",
				"06:00",
				"06:30",
				"07:00",
				"07:30",
				"08:00",
				"08:30",
				"09:00",
				"09:30",
				"10:00",
				"10:30",
				"11:00",
				"11:30",
				"12:00",
				"12:30",
				"13:00",
				"13:30",
				"14:00",
				"14:30",
				"15:00",
				"15:30",
				"16:00",
				"16:30",
				"17:00",
				"17:30",
				"18:00",
				"18:30",
				"19:00",
				"19:30",
				"20:00",
				"20:30",
				"21:00",
				"21:30",
				"22:00",
				"22:30",
				"23:00",
				"23:30",
			];

			const dayList = [false, false, false, false, false, false, false];
			const days = ["월", "화", "수", "목", "금", "토", "일"];
			const holidayList = store.holiday.split(",");
			const filteredHolidayList = dayList.map((day, index) => holidayList.includes(days[index]));

			const fullNameAddress = store.address_name.split("/");
			setStoreName(store.name);
			setStorePhoneNumber(store.phoneNumber);
			setStoreFirstAddress(fullNameAddress[0]);
			setStoreSecondAddress(fullNameAddress[1]);
			setStoreRegionDepthName({
				region_1depth_name: store.region_1depth_name,
				region_2depth_name: store.region_2depth_name,
				region_3depth_name: store.region_3depth_name,
			});
			setStoreImagePreview(store.simg);
			setStoreDescription(store.desc);
			setStoreStartTime({ value: timeList.indexOf(store.start), label: store.start });
			setStoreEndTime({ value: timeList.indexOf(store.end), label: store.end });
			setStoreHoliday(filteredHolidayList);
		}
	}, []);

	useEffect(() => {
		if (storeFirstAddress) {
			storeAddressValidate(storeFirstAddress);
		}
	}, [storeFirstAddress]);

	const handleStoreForm = e => {
		e.preventDefault();

		if (
			storeNameValidate(storeName) &&
			phoneNumberValidate(storePhoneNumber) &&
			storeAddressValidate(storeFirstAddress)
		) {
			const storeHolidays = ["월", "화", "수", "목", "금", "토", "일"]
				.filter((_, index) => storeHoliday[index])
				.join();

			let data;
			if (type === "edit") {
				data = {
					name: storeName,
					phoneNumber: storePhoneNumber,
					region_1depth_name: storeRegionDepthName.region_1depth_name,
					region_2depth_name: storeRegionDepthName.region_2depth_name,
					region_3depth_name: storeRegionDepthName.region_3depth_name,
					address_name: `${storeFirstAddress}/${storeSecondAddress}`,
					lat: location.center.lat,
					lng: location.center.lng,
					desc: storeDescription,
					holiday: storeHolidays,
					start: storeStartTime.value,
					end: storeEndTime.value,
				};
			} else {
				data = {
					businessLicense: storeBrn,
					name: storeName,
					phoneNumber: storePhoneNumber,
					region_1depth_name: storeRegionDepthName.region_1depth_name,
					region_2depth_name: storeRegionDepthName.region_2depth_name,
					region_3depth_name: storeRegionDepthName.region_3depth_name,
					address_name: `${storeFirstAddress}/${storeSecondAddress}`,
					lat: location.center.lat,
					lng: location.center.lng,
					desc: storeDescription,
					holiday: storeHolidays,
					start: storeStartTime.value,
					end: storeEndTime.value,
				};
			}

			const formData = new FormData();
			formData.append("file", storeImageFile);
			formData.append(
				type === "edit" ? "storeInfoReq" : "storeExtraInfoReq",
				new Blob([JSON.stringify(data)], { type: "application/json" })
			);
			storeFormApi(formData, nextURL);
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

	const storeAddressValidate = address => {
		if (!address.trim()) {
			setStoreAddressErrorMessage("배송지를 설정해주세요.");
			return false;
		} else {
			setStoreAddressErrorMessage("");
			return true;
		}
	};

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
					onBlur={e => {
						phoneNumberValidate(e.target.value);
					}}
					value={storePhoneNumber}
					HasError={storePhoneNumberErrorMessage}
					ref={el => (inputRef.current[1] = el)}
					isFocused={isFocusedInput}
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
						placeholder="&nbsp;&nbsp;주소를 입력해주세요."
						disabled
						value={formatFirstAddress(storeFirstAddress)}
						HasError={storeAddressErrorMessage}
						isFocused={isFocusedInput}
						// onClick={e => daumPostHandler(e)}
					/>
				</SignupAddressContainerButton>
				{storeAddressErrorMessage && <ErrorMessage>{storeAddressErrorMessage}</ErrorMessage>}
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
					<InputCounter>{storeDescription?.length}/500자</InputCounter>
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
					<Primary400LargeButton onClick={handleStoreForm}>
						{type === "edit" ? "수정 완료하기" : "가입 완료하기"}
					</Primary400LargeButton>
					<BlankSection height="16" />
					{type === "edit" && (
						<Primary50LargeButton
							onClick={() => {
								navigate(-1);
								// navigate(`/store/${sId}`);
							}}
						>
							취소하기
						</Primary50LargeButton>
					)}
				</ButtonToolBar>
			</form>
		</>
	);
}
