import React, { useEffect, useState } from "react";

import { useMypageInfoApi } from "../../hooks/useMypageInfoApi";
import { useUserInfoEditApi } from "../../hooks/useUserInfoEditApi";
import { usePhoneNumberEditApi } from "../../hooks/usePhoneNumberEditApi";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	userState,
	isNicknameValidState,
	isPhoneNumberValidState,
	isEditState,
	MyPageNicknameState,
	MyPagePhoneNumberState,
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
	MyPageEditImg,
	MyPageEditButtonFrame,
	MyPageStoreHeaderContainer,
} from "../../styles/myPage/MyPageHeaderStyle";
import {
	Text,
	BoldText,
	BottomBorderInput,
	ValidText,
	GrayText,
	MyPageBottomBorderInput,
	MyPageBottomBorderNameInput,
} from "../../styles/common/CommonStyle";
import { GreenCheckButton, Primary50CancelButton } from "../../styles/button/ButtonStyle";
import { TextLimit } from "../../styles/product/productForm/ProductFormStyle";

import EditIcon from "../../assets/myPage/EditIcon.png";
import defaultImg from "../../assets/default-store.png";
import { userInfoTypeState, ownersIdState } from "../../recoil/userInfo";

function MyPageHeader(props) {
	const [user, setUser] = useRecoilState(userState);
	const userInfoType = useRecoilValue(userInfoTypeState);
	const ownersId = useRecoilValue(ownersIdState);
	const [myPageNickname, setMyPageNickname] = useRecoilState(MyPageNicknameState);
	const [myPagePhoneNumber, setMyPagePhoneNumber] = useRecoilState(MyPagePhoneNumberState);

	// edit 여부로 편집창 open / close
	const [isEdit, setIsEdit] = useRecoilState(isEditState);

	// 유효성 검사
	const [isNameValid, setIsNicknameValid] = useRecoilState(isNicknameValidState);
	const [isPhoneNumberValid, setIsPhoneNumberValid] = useRecoilState(isPhoneNumberValidState);

	const mypageInfoApi = useMypageInfoApi();
	const phoneNumberEditApi = usePhoneNumberEditApi();
	const userInfoEditApi = useUserInfoEditApi();

	useEffect(() => {
		if (userInfoType === "CUSTOMER") {
			mypageInfoApi(userInfoType);
		} else {
			// mypageInfoApi(userInfoType, 8);
			mypageInfoApi(userInfoType, ownersId);
		}
	}, []);

	const handleClickValidate = () => {
		if (myPageNickname === "") {
			setIsNicknameValid(false);
			return;
		}

		if (myPagePhoneNumber === "") {
			setIsPhoneNumberValid(false);
			return;
		}

		userInfoEditApi();
	};

	const handleClickEditCancel = () => {
		setIsEdit(false);
	};

	const handleChangeName = e => {
		// setUser({ ...user, nickname: e.target.value });
		setMyPageNickname(e.target.value);
	};

	const handleClickEdit = () => {
		setIsEdit(true);
	};

	const handleChangePhoneNumber = e => {
		// setUser({
		// 	...user,
		// 	phoneNumber: e.target.value,
		// });
		setMyPagePhoneNumber(e.target.value);
	};

	return (
		<>
			{userInfoType === "CUSTOMER" ? (
				<MyPageHeaderContainer>
					{isEdit ? (
						<>
							<MyPageInfoSection>
								<>
									<EditContainer>
										<div>
											<MyPageBottomBorderNameInput
												onChange={handleChangeName}
												value={myPageNickname}
											/>
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
										<MyPageBottomBorderInput
											width="74"
											onChange={handleChangePhoneNumber}
											value={myPagePhoneNumber
												?.replace(/-/g, "")
												.replace(/[^0-9]/g, "")
												.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
												.replace(/\-{1,2}$/g, "")}
											maxLength="13"
										/>
										{/* <div>
							<GreenCheckButton onClick={handleClickPhoneNumberEditCheck} marginRight="4" />
							<Primary50CancelButton onClick={handleClickEditCancel} />
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
								<MyPageEditButtonFrame>
									<GreenCheckButton onClick={handleClickValidate} marginRight="4" />
									<Primary50CancelButton onClick={handleClickEditCancel} />
								</MyPageEditButtonFrame>
							</MyPageEditIconSection>
						</>
					) : (
						<>
							<MyPageInfoSection>
								<div>
									<BoldText size="23" bottom="32" font="nexon">
										{user?.nickname} 님
									</BoldText>
								</div>
								<div>
									<Text size="19">
										{user?.phoneNumber
											?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
											?.replace(/\-{1,2}$/g, "")}
									</Text>
								</div>
							</MyPageInfoSection>
							<MyPageEditIconSection>
								<MyPageEditIconFrame>
									<MyPageEditImg
										type="CUSTOMER"
										src={EditIcon}
										onClick={handleClickEdit}
										alt="editIcon"
									/>
								</MyPageEditIconFrame>
							</MyPageEditIconSection>
						</>
					)}
				</MyPageHeaderContainer>
			) : (
				<>
					<MyPageStoreHeaderContainer>
						<BoldText size="23" font="nexon">
							{user?.name} 님
						</BoldText>
						<div>
							<img type="STORE" src={user?.simg === null ? defaultImg : user?.simg} alt="" />
						</div>
					</MyPageStoreHeaderContainer>
				</>
			)}
		</>
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
		// <img type="CUSTOMER" src={EditIcon} onClick={handleClickNameEdit} alt="editIcon" />
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
		// 			<Primary50CancelButton onClick={handleClickEditCancel} />
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
