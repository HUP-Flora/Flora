import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { BoldText } from "../../styles/common/CommonStyle";
import { GrayText, ButtonImage } from "../../styles/reservation/ReservationStyle.js";
import { Primary400LargeButton, WhiteLargeButton } from "../../styles/button/ButtonStyle";
import {
	SignupTitleSection,
	SignupContentSection,
	SignupButtonSection,
} from "../../styles/common/SectionStyle";

import UserIcon from "../../assets/signup/UserIcon.png";
import OwnerIcon from "../../assets/signup/OwnerIcon.png";
import UserSelectedIcon from "../../assets/signup/UserSelectedIcon.png";
import OwnerSelectedIcon from "../../assets/signup/OwnerSelectedIcon.png";

import { userTypeState } from "../../recoil/signup";
import { SignupPaddingX16Container } from "../../styles/container/ContainerStyle";

export function Signup() {
	const [userType, setUserType] = useRecoilState(userTypeState);
	const navigate = useNavigate();

	const typeList = ["user", "owner"];

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		const token = params.get("token");
		localStorage.setItem("AccessToken", token);
	}, []);

	const handleSignup = () => {
		if (userType === "user") {
			navigate("/signup/user");
		} else if (userType === "owner") {
			navigate("/signup/owner");
		}
	};

	return (
		<SignupPaddingX16Container>
			<SignupTitleSection height="74" top="102">
				<BoldText font="nexon" size="28">
					당신은 누구신가요?
				</BoldText>
				<GrayText font="nexon">사용자 유형을 선택해주세요</GrayText>
			</SignupTitleSection>
			<SignupContentSection height="208">
				{typeList.map(type => (
					<WhiteLargeButton
						key={type}
						onClick={() => setUserType(type)}
						isClick={userType === type}
					>
						<ButtonImage
							src={
								type === "user"
									? userType === type
										? UserSelectedIcon
										: UserIcon
									: userType === type
									? OwnerSelectedIcon
									: OwnerIcon
							}
						/>
						<GrayText isClick={userType === type}>
							{type === "user" ? "일반 사용자" : "꽃집 사장님"}
						</GrayText>
					</WhiteLargeButton>
				))}
			</SignupContentSection>
			<SignupButtonSection>
				<Primary400LargeButton onClick={handleSignup}>다음으로</Primary400LargeButton>
			</SignupButtonSection>
		</SignupPaddingX16Container>
	);
}
