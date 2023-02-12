import styled from "styled-components";
import { SignupPaddingX16Frame } from "../common/FrameStyle";

export const Gray50Container = styled.div`
	background-color: #f8f9fa;
`;

export const WhiteContainer = styled.div`
	padding-left: 16px;
	padding-right: 16px;
`;

export const FullContainer = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const SignupPaddingX16Container = styled(SignupPaddingX16Frame)`
	width: 100vw;
	height: 100vh;
`;

export const Padding16Container = styled.div`
	padding: 16px;
`;

export const Gray50Padding16Container = styled(Gray50Container)`
	${Padding16Container}
`;
