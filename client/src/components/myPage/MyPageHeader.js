import React, { useEffect, useState } from "react";

import { useInfoApi, useNicknameEditApi, usePhoneNumberEditApi } from "../../hooks/useMypageApi";

import { useRecoilState } from "recoil";
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

function MyPageHeader(props) {
	// 더미 데이터 시작 -------------
	const type = "owner";
	// const type = "customer";
	// 더미 데이터 끝 -----

	const [user, setUser] = useRecoilState(userState);

	// edit 여부로 편집창 open / close
	const [isNameEdit, setIsNicknameEdit] = useRecoilState(isNicknameEditState);
	const [isPhoneNumberEdit, setIsPhoneNumberEdit] = useRecoilState(isPhoneNumberEditState);

	// 유효성 검사
	const [isNameValid, setIsNicknameValid] = useRecoilState(isNicknameValidState);
	const [isPhoneNumberValid, setIsPhoneNumberValid] = useRecoilState(isPhoneNumberValidState);

	const infoApi = useInfoApi();
	const nicknameEditApi = useNicknameEditApi();
	const phoneNumberEditApi = usePhoneNumberEditApi();

	useEffect(() => {
		if (type === "customer") {
			infoApi(type);
		} else {
			infoApi(type, 8);
			// infoApi(type, sId);
		}
	}, []);

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
		<HeaderConianer type={type}>
			{type === "customer" ? (
				<>
					{isNameEdit ? (
						<>
							<EditContainer>
								<div>
									<BottomBorderInput onChange={handleChangeName} value={user?.nickname} />
									<TextLimit>
										<GrayText size="11">{user?.nickname?.length} / 25자</GrayText>
									</TextLimit>
								</div>
								<div>
									<GreenCheckButton onClick={e => handleClickNameEditCheck(e)} marginRight="4" />
									<Primary50CancelButton onClick={handleClickNameEditCancel} />
								</div>
							</EditContainer>
							{!isNameValid && (
								<ValidTextWrapper>
									<ValidText>이름을 입력해주세요.</ValidText>
								</ValidTextWrapper>
							)}
						</>
					) : (
						<>
							<div>
								<BoldText size="23" font="nexon">
									{user?.nickname} 님
								</BoldText>
								<img type="customer" src={EditIcon} onClick={handleClickNameEdit} />
							</div>
						</>
					)}
					{isPhoneNumberEdit ? (
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
								<div>
									<GreenCheckButton onClick={handleClickPhoneNumberEditCheck} marginRight="4" />
									<Primary50CancelButton onClick={handleClickPhoneNumberEditCancel} />
								</div>
							</EditContainer>
							{!isPhoneNumberValid && (
								<ValidTextWrapper>
									<ValidText>전화번호를 입력해주세요.</ValidText>
								</ValidTextWrapper>
							)}
						</>
					) : (
						<>
							<div>
								<Text size="19">
									{user?.phoneNumber
										?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
										?.replace(/\-{1,2}$/g, "")}
								</Text>
								<img type="customer" src={EditIcon} onClick={handleClickPhoneNumberEdit} />
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div>
						<BoldText size="23" font="nexon">
							{user?.name} 님
						</BoldText>
						<div>
							<img type="owner" src={user?.simg === null ? defaultImg : user?.simg} alt="" />
						</div>
					</div>
				</>
			)}
		</HeaderConianer>
	);
}

export default MyPageHeader;
