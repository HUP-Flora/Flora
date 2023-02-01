import styled from "styled-components";

export const SessionContainer = styled.div`
	height: 50%;
	position: relative;
`;

export const OwnerVideo = styled.div`
	height: 100%;
`;

export const CustomerVideo = styled.div`
	width: 30%;
`;

export const StreamVideo = styled.video`
	height: 100%;

	position: absolute;

	margin: 0;
	margin-left: -50px;

	left: 50%;
	right: 0;
`;

export const LeaveSessionButton = styled.button`
	padding: 10px;
	background-color: red;
`;

export const SessionWrapper = styled.div`
	height: 100%;
	position: absolute;
`;

export const SessionHeader = styled.div`
	position: absolute;
	z-index: 50;
`;
