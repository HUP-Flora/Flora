package com.ssafy.floraserver.api.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PayAppReqVo {

    // 가맹점 코드
    private String cid;
    // 가맹점 코드 인증키
    private String cid_secret;
    // 결제 고유번호
    private String tid;
    // 가맹점 주문번호
    private String partner_order_id;
    // 가맹점 회원 id
    private String partner_user_id;
    // 결제승인 요청 인증 토큰
    private String pg_token;
    // 결제 승인에 대해 저장하고 싶은 값
    private String payload;
    // 상품 총액
    private String total_amount;

}
