import {
  MessageDiv,
  MessageBoldDiv,
  MessageSection,
} from "../../../styles/payment/success/MessageCardStyle";
import ValidatingTicket from "../../../assets/validating-ticket.png";

export function MessageCard() {
  return (
    <MessageSection>
      <img src={ValidatingTicket} alt="결제 완료" />
      <MessageBoldDiv>결제가 완료되었습니다.</MessageBoldDiv>
      <MessageDiv>잘 전달해드릴게요 !</MessageDiv>
    </MessageSection>
  );
}
