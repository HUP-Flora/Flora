package com.ssafy.floraserver.api.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class PayAppResVo {

    // 요청 고유 번호
    private String aid;
    // 결제 고유 번호
    private String tid;
    // 가맹점 코드
    private String cid;
    // 정기 결제용
    private String sid;
    // 가맹점 주문번호
    private String partner_order_id;
    // 가맹점 회원 id
    private String partner_user_id;
    // 결제 수단. CARD / MONEY
    private String payment_method_type;
    // 결제 금액 정보
    private AmountVo amount;
    // 결제 상세 정보
    private CardInfoVo card_info;
    // 상품 이름
    private String item_name;
    // 상품 코드
    private String item_code;
    // 상품 수량
    private Integer quantity;
    // 결제 준비 요청 시각
    private LocalDateTime created_at;
    // 결제 승인 시각
    private LocalDateTime approved_at;
    // 결제 승인 요청에 대해 저장한 값
    private String payload;

}
