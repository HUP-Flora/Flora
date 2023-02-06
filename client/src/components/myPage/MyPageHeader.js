import React, { useState } from "react";

import {
	HeaderConianer,
	EditContainer,
	ValidTextWrapper,
} from "../../styles/myPage/MyPageHeaderStyle";
import { Text, BoldText, BottomBorderInput, ValidText } from "../../styles/common/CommonStyle";
import { GreenCheckButton, Primary50CancelButton } from "../../styles/button/ButtonStyle";

import EditIcon from "../../assets/myPage/EditIcon.png";
import StoreImage from "../../assets/store.png";

function MyPageHeader(props) {
	// 더미 데이터
	const customer = {
		name: "홍길동",
		phoneNumber: "010-1234-5678",
	};

	const owner = {
		name: "꽃집이요",
		image: { StoreImage },
	};

	// const type = "owner";
	const type = "customer";

	// 더미 데이터 끝 -----

	const [name, setName] = useState(customer.name);
	const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

	const [isNameEdit, setIsNameEdit] = useState(false);
	const [isPhoneNumberEdit, setIsPhoneNumberEdit] = useState(false);

	// 유효성 검사
	const [isNameValid, setIsNameValid] = useState(true);
	const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

	const handleClickNameEdit = () => {
		setIsNameEdit(true);
	};

	const handleClickNameEditCheck = () => {
		// (백) 연동
		if (name === "") {
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
		setName(e.target.value);
	};

	// 전화번호
	const handleClickPhoneNumberEdit = () => {
		setIsPhoneNumberEdit(true);
	};

	const handleClickPhoneNumberEditCheck = () => {
		// (백) 연동
		if (phoneNumber === "") {
			setIsPhoneNumberValid(false);
		} else {
			setIsPhoneNumberValid(true);
			setIsPhoneNumberEdit(false);
		}
	};

	const handleClickPhoneNumberEditCancel = () => {
		setIsPhoneNumberEdit(false);
	};

	const handleChangePhoneNumber = e => {
		setPhoneNumber(e.target.value);
	};

	return (
		<HeaderConianer type={type}>
			{type === "customer" ? (
				<>
					{isNameEdit ? (
						<>
							<EditContainer>
								<BottomBorderInput
									width="30"
									onChange={handleChangeName}
									value={name}
									defaultValue={customer.name}
								/>
								<GreenCheckButton onClick={e => handleClickNameEditCheck(e)} marginRight="4" />
								<Primary50CancelButton onClick={handleClickNameEditCancel} />
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
									{customer.name} 님
								</BoldText>
								<img type="customer" src={EditIcon} onClick={handleClickNameEdit} />
							</div>
						</>
					)}
					{isPhoneNumberEdit ? (
						<>
							<EditContainer>
								<BottomBorderInput
									width="30"
									onChange={handleChangePhoneNumber}
									value={phoneNumber}
									defaultValue={customer.phoneNumber}
								/>
								<GreenCheckButton onClick={handleClickPhoneNumberEditCheck} marginRight="4" />
								<Primary50CancelButton onClick={handleClickPhoneNumberEditCancel} />
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
								<Text size="19">{customer.phoneNumber}</Text>
								<img type="customer" src={EditIcon} onClick={handleClickPhoneNumberEdit} />
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div>
						<BoldText size="23" font="nexon">
							{owner.name} 님
						</BoldText>
						<div>
							<img type="owner" src={owner.image.StoreImage} alt="" />
						</div>
					</div>
				</>
			)}
		</HeaderConianer>
	);
}

export default MyPageHeader;
