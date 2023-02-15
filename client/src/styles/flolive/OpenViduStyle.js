import styled from "styled-components";

export const SessionContainer = styled.div`
	height: 55%;
	position: relative;
`;

export const VideoContainer = styled.div`
	background-color: black;

	width: 100%;
	height: 100%;
`;

export const OwnerVideo = styled.div`
	position: absolute;

	width: 100%;
	height: 100%;
`;

export const CustomerVideo = styled.div`
	width: 20%;

	position: relative;
	display: flex;

	overflow: hidden;

	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	::after {
		padding-bottom: 100%;
		content: "";
		display: block;
	}
`;

export const StreamVideo = styled.video`
	height: 100%;

	position: absolute;

	margin: 0;

	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const SessionWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
`;

export const SessionHeader = styled.div`
	width: 100%;

	position: absolute;
	justify-content: space-between;
	display: flex;

	padding: 16px;

	z-index: 50;
`;

export const LeaveSessionButton = styled.button`
	height: fit-content;

	padding: 5px 13px;

	background-color: #f03e3e;
	color: white;
	font-size: 13px;
	font-weight: 400;

	border: none;
	border-radius: 13px;

	filter: drop-shadow(0px 0px 5px rgba(240, 62, 62, 0.5));
`;

export const SwitchCameraWrapper = styled.div`
	width: fit-content;
	height: fit-content;

	display: flex;

	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(3px);

	border-radius: 50%;

	> img {
		width: 20px;
		height: 20px;

		margin: 8px;
	}
`;

export const ButtonsContainer = styled.div`
	width: 80%;

	display: flex;
	justify-content: space-between;

	padding-right: 16px;
`;
