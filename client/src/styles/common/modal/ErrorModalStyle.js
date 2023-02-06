import styled, { keyframes } from "styled-components";

export const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
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

export const Modal = styled.div`
	position: absolute;
	top: 40vh;
	left: 5%;
	width: 90%;
	background-color: white;
	padding: 32px;
	border-radius: 14px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	z-index: 30;
	animation: ${SlideDown} 300ms ease-out forwards;

	@media screen and (min-width: 768px) {
		width: 40rem;
		left: calc(50% - 20rem);
	}
`;

export const ModalTitle = styled.h2`
	font-size: 24px;
	font-weight: 700;
	margin: 0;
`;

export const FlexBox = styled.div`
	display: flex;
	align-items: center;
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

export const ConfirmModalBox = styled(Modal)`
	& > p:nth-child(1) {
		font-size: 19px;
		font-weight: bold;
		text-align: center;
	}
`;

export const ConfirmModalButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 32px;
	padding: 0 24px;
	
	& > button {
		width: 84px;
		height: 44px;
		border: none;
		border-radius: 10px;
		font-weight: bold;
  }
	
	& > button:nth-child(1) {
		background-color: var(--primary-400);
		color: white;
  }
	
	& > button:nth-child(2) {
		background-color: var(--primary-50);
		color: var(--primary-400);
  }
`;
