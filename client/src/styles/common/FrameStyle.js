import styled from "styled-components";
import { BodyFrame, PaddingX16 } from "./CommonStyle";

export const SignupPaddingX16Frame = styled(PaddingX16)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const SignupBodyFrame = styled(BodyFrame)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const SearchListCenterFrame = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;
