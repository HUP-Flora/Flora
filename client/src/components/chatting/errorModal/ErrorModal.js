import React from 'react';
import { Backdrop, ErrorImage, FlexBox, Modal, ModalTitle } from "../../../styles/common/modal/ErrorModalStyle";
import {useRecoilState} from "recoil";
import {isErrorModalShowState} from "../../../recoil/chatting";
import PortalReactDom from "react-dom";

function ErrorModal() {
  const [isErrorModalShow, setIsErrorModalShow] = useRecoilState(isErrorModalShowState);

  const toggleModal = () => {
    setIsErrorModalShow(!isErrorModalShow);
  }
  return (
    <>
      {PortalReactDom.createPortal(
        <Backdrop onClick={toggleModal} />,
        document.getElementById('backdrop-root')
      )}
      {PortalReactDom.createPortal(
        <Modal>
        <FlexBox>
          <ErrorImage src="data:image/png;base64,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" />
          <ModalTitle>오류</ModalTitle>
        </FlexBox>
        <p>입력을 확인해주세요.</p>
      </Modal>,
      document.getElementById("overlay-root")
      )}
    </>
  );
}

export default ErrorModal;