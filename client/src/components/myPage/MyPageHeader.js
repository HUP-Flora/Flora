import React, { useEffect, useState } from "react";

import axios from "axios";

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
import StoreImage from "../../assets/store.png";

function MyPageHeader(props) {
	// 더미 데이터
	// const uId = 11111;

	// edit 여부로 편집창 open / close
	const [isNameEdit, setIsNameEdit] = useState(false);
	const [isPhoneNumberEdit, setIsPhoneNumberEdit] = useState(false);

	const [user, setUser] = useState({});

	useEffect(() => {
		// 고객
		// const response = axios.get(`/api/users/${uId}`);
		const response = {
			nickname: "홍길동",
			phoneNumber: "01034032342",
		};

		// setNickname(response.nickname);
		// setPhoneNumber(response.phoneNumber);

		// 가게
		// const response = axios.get(`/api/stores/{sId}`);
		// const response = {
		// 	sId: 11111,
		// 	name: "lorem Ipsum",
		// 	sImg: { StoreImage },
		// };

		// setUser(response.data);
		setUser(response);
	}, []);

	// const type = "owner";
	const type = "customer";

	// 더미 데이터 끝 -----

	// 유효성 검사
	const [isNameValid, setIsNameValid] = useState(true);
	const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

	const handleClickNameEdit = () => {
		setIsNameEdit(true);
	};

	const handleClickNameEditCheck = () => {
		// (백) 연동
		if (user?.nickname === "") {
			setIsNameValid(false);
		} else {
			setIsNameValid(true);
			setIsNameEdit(false);
		}
	};

	const handleClickNameEditCancel = () => {
		setIsNameEdit(false);
	};

	const handleChangeName = e => {
		setUser({ ...user, nickname: e.target.value });
	};

	// 전화번호
	const handleClickPhoneNumberEdit = () => {
		setIsPhoneNumberEdit(true);
	};

	const handleClickPhoneNumberEditCheck = () => {
		// (백) 연동
		if (user.phoneNumber === "") {
			setIsPhoneNumberValid(false);
		} else {
			setIsPhoneNumberValid(true);
			setIsPhoneNumberEdit(false);

			// axios
			// 	.put(`/users`, {
			// 		nickname: user.nickname,
			// 		phoneNumber: user.phoneNumber,
			// 	})
			// 	.then(res => {
			// 		setIsPhoneNumberValid(true);
			// 		setIsPhoneNumberEdit(false);
			// 	})
			// 	.catch(err => {
			// 		// 예외 처리
			// 	});
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
										<GrayText size="11">{user.nickname.length} / 25자</GrayText>
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
										.replace(/-/g, "")
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
							<img type="owner" src={user?.sImg?.StoreImage} alt="" />
						</div>
					</div>
				</>
			)}
		</HeaderConianer>
	);
}

export default MyPageHeader;
