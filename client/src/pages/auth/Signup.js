import { Primary400LargeButton } from "../../styles/button/ButtonStyle";
import { BoldText } from "../../styles/common/CommonStyle";
import { WhiteContainer } from "../../styles/container/ContainerStyle";
import OwnerIcon from "../../assets/signup/OwnerIcon.png";
import OwnerSelectedIcon from "../../assets/signup/OwnerSelectedIcon.png";
import UserIcon from "../../assets/signup/UserIcon.png";
import UserSelectedIcon from "../../assets/signup/UserSelectedIcon.png";
import { ButtonToolBar } from "../../styles/bar/BarStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, userState } from "../../recoil/signup";
import {
	GrayText,
	ButtonImage,
	FirstWhiteLargeButton,
	SecondWhiteLargeButton,
} from "../../styles/reservation/ReservationStyle.js";
import { useEffect } from "react";

export function Signup() {
	const [user, setUser] = useRecoilState(userState);
	const setToken = useSetRecoilState(accessTokenState);
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		const token = params.get("token");
		setToken(token);
	}, []);

	const handleSignup = () => {
		if (user === "user") {
			navigate("/signup/user");
		} else if (user === "owner") {
			navigate("/signup/owner");
		}
	};

	return (
		<WhiteContainer>
			<BoldText font="nexon" size="28" top="102" bottom="24">
				당신은 누구신가요?
			</BoldText>
			<GrayText font="nexon" bottom="128">
				사용자 유형을 선택해주세요
			</GrayText>
			<FirstWhiteLargeButton onClick={() => setUser("user")} isClick={user === "user"}>
				<ButtonImage src={user === "user" ? UserSelectedIcon : UserIcon} />
				<GrayText isClick={user === "user"}>일반 사용자</GrayText>
			</FirstWhiteLargeButton>
			<SecondWhiteLargeButton onClick={() => setUser("owner")} isClick={user === "owner"}>
				<ButtonImage src={user === "owner" ? OwnerSelectedIcon : OwnerIcon} />
				<GrayText isClick={user === "owner"}>꽃집 사장님</GrayText>
			</SecondWhiteLargeButton>
			<ButtonToolBar>
				<Primary400LargeButton onClick={handleSignup}>다음으로</Primary400LargeButton>
			</ButtonToolBar>
		</WhiteContainer>
	);
}
