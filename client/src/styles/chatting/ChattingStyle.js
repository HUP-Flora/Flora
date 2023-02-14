import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    height: 0;
  }

  to {
    height: calc(100vh - 50%);
  }
`;

const slideDown = keyframes`
  from {
    height: calc(100vh - 50%);
  }

  to {
    height: 0;
  }
`;

export const ChatLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f8f9fa;
  border-radius: 20px 20px 0 0;

  width: 100%;
  position: absolute;
  bottom: 0;
  overflow: hidden;

  height: ${props => props.isShowChat ? "calc(100vh - 50%)" : "0"};
  animation: ${props => props.isShowChat ? slideUp : slideDown} 0.5s ease-in-out;
`;
