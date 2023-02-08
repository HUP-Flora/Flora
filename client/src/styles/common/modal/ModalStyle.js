import styled, { keyframes } from "styled-components";

export const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 50;
	background-color: rgba(0, 0, 0, 0.75);
`;

const SlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SearchContainer = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

export const Modal = styled.div`
	position: absolute;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin-left: ${props => (props.marginLeft ? props.marginLeft : -150)}px; /* width의 50% */
	margin-top: -50px; /* height의 50% */

	background-color: white;
	padding: 32px ${props => (props.paddingRow ? props.paddingRow : 48)}px;
	border-radius: 14px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	z-index: 60;
	animation: ${SlideDown} 300ms ease-out forwards;
`;

export const ModalTitle = styled.h2`
	font-size: 19px;
	font-weight: 700;
	margin: 0;
`;

export const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
`;

export const ErrorImage = styled.img`
	width: 40px;
	height: 40px;
	margin-right: 16px;
`;

export const PostModal = styled(Modal)`
	top: 10vh;
`;

export const DoubleButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;

	> button {
		width: 100%;
	}

	> button:first-child {
		margin-right: 20px;
	}

	> button:last-child {
		margin-left: 20px;
	}
`;

export const CalendarModalContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 60;
	// animation: ${SlideDown} 300ms ease-out forwards;
	transform: translate(-50%, -50%);
`;

export const SearchStoreModalContainer = styled(CalendarModalContainer)`
	z-index: 60;
`;

export const SearchStoreContainer = styled.div`
	background-color: white;
	padding: 32px;
	border-radius: 30px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	z-index: 30;
	animation: ${SlideDown} 300ms ease-out forwards;
	width: 300px;
	height: 400px;
	text-align: center;
`;

export const CalendarFlexBox = styled(FlexBox)`
	// position: absolute;
	// top: 50px;
	// left: 50px;
	// transform: translate(-50%, -50%);
`;

export const Container = styled.div``;
