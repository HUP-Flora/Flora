package com.ssafy.floraserver.api.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardInfoVo {

    // 매입 카드사 한글명
    private String purchase_corp;
    // 매입 카드사 코드
    private String purchase_corp_code;
    // 카드 발급사 한글명
    private String issuer_corp;
    // 카드 발급사 코드
    private String issuer_corp_code;
    // 카카오페이 매입사명
    private String kakaopay_purchas_corp;
    // 카카오페이 매입사 코드
    private String kakaopay_purchase_corp_code;
    // 카카오페이 발급사명
    private String kakaopay_issuer_corp;
    // 카카오페이 발급사 코드
    private String kakaopay_issuer_corp_code;
    // 카드 bin
    private String bin;
    // 카드 타임
    private String card_type;
    // 할부 개월 수
    private String install_month;
    // 카드사 승인번호
    private String approved_id;
    // 카드사 가맹점 번호
    private String card_mid;
    // 무이자할부 여부. Y/N
    private String interest_free_install;
    // 카드 상품 코드
    private String card_item_code;

}
