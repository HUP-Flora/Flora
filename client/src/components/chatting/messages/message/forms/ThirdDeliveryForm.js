import React, {useEffect, useRef} from 'react';
import {useOrderStates} from "../../../../../hooks/use-orderStates";
import {
  FormContent, FormFooter, FormFooterMessage, FormFooterMessageContainer,
  FormHeaderContainer, FormTime,
  FormWrapper, GiftMessageInput,
  InputLabel,
  MarginBottom16TextInput, SubmitPaymentButton,
  TextInput
} from "../../../../../styles/chatting/Messages/Message/forms/OtherFormStyle";

function ThirdDeliveryForm({time}) {
  const textarea = useRef();

  useEffect(() => {
    textarea.current.style.height = 'auto'; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }, []);

  const {
    sendUser,
    sendUserPhone,
    giftCard,
    paymentAmount,
    receiveUser,
    receiveUserPhone,
  } = useOrderStates();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const OpaymentAmount = numberWithCommas(paymentAmount);

  return (
    <>
      <FormWrapper>
        <FormHeaderContainer>배달 주문 확인</FormHeaderContainer>
        <FormContent>
          <InputLabel htmlFor="sendUser">보내는 분</InputLabel>
          <TextInput
            type="text"
            id="sendUser"
            value={sendUser}
            disabled
          />
          <InputLabel htmlFor="sendUserPhone">보내는 분 전화번호</InputLabel>
          <MarginBottom16TextInput
            type="text"
            id="sendUserPhone"
            maxLength="13"
            value={sendUserPhone}
            disabled
          />
          <InputLabel htmlFor="reciveUser">받는 분</InputLabel>
          <TextInput
            type="text"
            id="reciveUser"
            value={receiveUser}
            disabled
          />
          <InputLabel htmlFor="reciveUserPhone">받는 분 전화번호</InputLabel>
          <MarginBottom16TextInput
            type="text"
            id="reciveUserPhone"
            maxLength="13"
            value={receiveUserPhone}
            disabled
          />
          <InputLabel htmlFor="giftCard" >선물 카드 내용</InputLabel>
          <GiftMessageInput
            id="giftCard"
            ref={textarea}
            value={giftCard}
            disabled
          />
        </FormContent>
        <FormFooter>
          <FormFooterMessageContainer>
            <FormFooterMessage>결제 금액</FormFooterMessage>
            <FormFooterMessage>{OpaymentAmount}원</FormFooterMessage>
          </FormFooterMessageContainer>
          <SubmitPaymentButton>결제하기</SubmitPaymentButton>
        </FormFooter>
      </FormWrapper>
      <FormTime>{time}</FormTime>
    </>
  );
}

export default ThirdDeliveryForm;