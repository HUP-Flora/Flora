import React, { useEffect, useState } from "react";

import { useMypageInfoApi } from "../../hooks/useMypageInfoApi";
import { useNicknameEditApi } from "../../hooks/useNicknameEditApi";
import { usePhoneNumberEditApi } from "../../hooks/usePhoneNumberEditApi";

import { useRecoilState, useRecoilValue } from "recoil";
import {
	userState,
	isNicknameValidState,
	isPhoneNumberValidState,
	isNicknameEditState,
	isPhoneNumberEditState,
} from "../../recoil/mypage";

import {
	HeaderConianer,
	EditContainer,
	ValidTextWrapper,
	EditFlexContainer,
	MyPageHeaderContainer,
	MyPageInfoSection,
	MyPageEditIconSection,
	MyPageEditIconFrame,
} from "../../styles/myPage/MyPageHeaderStyle";
import {
	Text,
	BoldText,
	BottomBorderInput,
	ValidText,
	GrayText,
} from "../../styles/common/CommonStyle";
import { GreenCheckButton, Primary50CancelButton } from "../../styles/button/ButtonStyle";
import { TextLimit } from "../../styles/product/productForm/ProductFormStyle";

import EditIcon from "../../assets/myPage/EditIcon.png";
import defaultImg from "../../assets/default-store.png";
import { userInfoTypeState } from "../../recoil/userInfo";

function MyPageHeader(props) {
	const [user, setUser] = useRecoilState(userState);
	const userInfoType = useRecoilValue(userInfoTypeState);

	// edit 여부로 편집창 open / close
	const [isNameEdit, setIsNicknameEdit] = useRecoilState(isNicknameEditState);
	const [isPhoneNumberEdit, setIsPhoneNumberEdit] = useRecoilState(isPhoneNumberEditState);

	// 유효성 검사
	const [isNameValid, setIsNicknameValid] = useRecoilState(isNicknameValidState);
	const [isPhoneNumberValid, setIsPhoneNumberValid] = useRecoilState(isPhoneNumberValidState);

	const mypageInfoApi = useMypageInfoApi();
	const nicknameEditApi = useNicknameEditApi();
	const phoneNumberEditApi = usePhoneNumberEditApi();

	useEffect(() => {
		if (userInfoType === "CUSTOMER") {
			mypageInfoApi(userInfoType);
		} else {
			mypageInfoApi(userInfoType, 8);
			// mypageInfoApi(type, sId);
		}
	}, []);

	const handleClickValidate = () => {
		// if ()
	};

	const handleClickNameEdit = () => {
		setIsNicknameEdit(true);
	};

	const handleClickNameEditCheck = () => {
		if (user?.nickname === "") {
			setIsNicknameValid(false);
		} else {
			nicknameEditApi(user.nickname);
		}
	};

	const handleClickNameEditCancel = () => {
		setIsNicknameEdit(false);
	};

	const handleChangeName = e => {
		setUser({ ...user, nickname: e.target.value });
	};

	// 전화번호
	const handleClickPhoneNumberEdit = () => {
		setIsPhoneNumberEdit(true);
	};

	const handleClickPhoneNumberEditCheck = () => {
		if (user.phoneNumber === "") {
			setIsPhoneNumberValid(false);
		} else {
			phoneNumberEditApi(user.phoneNumber);
		}
	};

	const handleClickPhoneNumberEditCancel = () => {
		setIsPhoneNumberEdit(false);
	};

	const handleChangePhoneNumber = e => {
		setUser({
			...user,
			phoneNumber: e.target.value,
		});
	};

	return (
		<MyPageHeaderContainer>
			{userInfoType === "CUSTOMER" ? (
				<>
					<MyPageInfoSection>
						<>
							<EditContainer>
								<div>
									<BottomBorderInput onChange={handleChangeName} value={user?.nickname} />
									<TextLimit>
										<GrayText size="11">{user?.nickname?.length} / 25자</GrayText>
									</TextLimit>
								</div>
								{/* <div>
							<GreenCheckButton onClick={e => handleClickNameEditCheck(e)} marginRight="4" />
							<Primary50CancelButton onClick={handleClickNameEditCancel} />
						</div> */}
							</EditContainer>
							{!isNameValid && (
								<ValidTextWrapper>
									<ValidText>이름을 입력해주세요.</ValidText>
								</ValidTextWrapper>
							)}
						</>
						<>
							<EditContainer>
								<BottomBorderInput
									onChange={handleChangePhoneNumber}
									value={user?.phoneNumber
										?.replace(/-/g, "")
										.replace(/[^0-9]/g, "")
										.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
										.replace(/\-{1,2}$/g, "")}
									maxLength="13"
								/>
								{/* <div>
							<GreenCheckButton onClick={handleClickPhoneNumberEditCheck} marginRight="4" />
							<Primary50CancelButton onClick={handleClickPhoneNumberEditCancel} />
						</div> */}
							</EditContainer>
							{!isPhoneNumberValid && (
								<ValidTextWrapper>
									<ValidText>전화번호를 입력해주세요.</ValidText>
								</ValidTextWrapper>
							)}
						</>
					</MyPageInfoSection>
					<MyPageEditIconSection>
						<MyPageEditIconFrame>
							<GreenCheckButton onClick={handleClickValidate} marginRight="4" />
							<Primary50CancelButton onClick={handleClickPhoneNumberEditCancel} />
						</MyPageEditIconFrame>
					</MyPageEditIconSection>
				</>
			) : (
				<></>
			)}
		</MyPageHeaderContainer>
		// <HeaderConianer type={userInfoType}>
		// 	{userInfoType === "CUSTOMER" ? (
		// 		<>
		// 			{isNameEdit ? (
		// <>
		// 	<EditContainer>
		// 		<div>
		// 			<BottomBorderInput onChange={handleChangeName} value={user?.nickname} />
		// 			<TextLimit>
		// 				<GrayText size="11">{user?.nickname?.length} / 25자</GrayText>
		// 			</TextLimit>
		// 		</div>
		// 		<div>
		// 			<GreenCheckButton onClick={e => handleClickNameEditCheck(e)} marginRight="4" />
		// 			<Primary50CancelButton onClick={handleClickNameEditCancel} />
		// 		</div>
		// 	</EditContainer>
		// 	{!isNameValid && (
		// 		<ValidTextWrapper>
		// 			<ValidText>이름을 입력해주세요.</ValidText>
		// 		</ValidTextWrapper>
		// 	)}
		// </>
		// 			) : (
		// <>
		// 	<div>
		// 		<BoldText size="23" font="nexon">
		// 			{user?.nickname} 님
		// 		</BoldText>
		// 		<img type="CUSTOMER" src={EditIcon} onClick={handleClickNameEdit} alt="editIcon" />
		// 	</div>
		// </>
		// 			)}
		// 			{isPhoneNumberEdit ? (
		// <>
		// 	<EditContainer>
		// 		<BottomBorderInput
		// 			onChange={handleChangePhoneNumber}
		// 			value={user?.phoneNumber
		// 				?.replace(/-/g, "")
		// 				.replace(/[^0-9]/g, "")
		// 				.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
		// 				.replace(/\-{1,2}$/g, "")}
		// 			maxLength="13"
		// 		/>
		// 		<div>
		// 			<GreenCheckButton onClick={handleClickPhoneNumberEditCheck} marginRight="4" />
		// 			<Primary50CancelButton onClick={handleClickPhoneNumberEditCancel} />
		// 		</div>
		// 	</EditContainer>
		// 	{!isPhoneNumberValid && (
		// 		<ValidTextWrapper>
		// 			<ValidText>전화번호를 입력해주세요.</ValidText>
		// 		</ValidTextWrapper>
		// 	)}
		// </>
		// 			) : (
		// 				<>
		// 					<div>
		// 						<Text size="19">
		// 							{user?.phoneNumber
		// 								?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
		// 								?.replace(/\-{1,2}$/g, "")}
		// 						</Text>
		// 						<img type="CUSTOMER" src={EditIcon} onClick={handleClickPhoneNumberEdit} alt="" />
		// 					</div>
		// 				</>
		// 			)}
		// 		</>
		// 	) : (
		// 		<>
		// 			<div>
		// 				<BoldText size="23" font="nexon">
		// 					{user?.name} 님
		// 				</BoldText>
		// 				<div>
		// 					<img type="STORE" src={user?.simg === null ? defaultImg : user?.simg} alt="" />
		// 				</div>
		// 			</div>
		// 		</>
		// 	)}
		// </HeaderConianer>
	);
}

export default MyPageHeader;
