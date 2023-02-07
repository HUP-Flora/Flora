package com.ssafy.floraserver.api.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AmountVo {

    // 전체 결제 금액
    private Integer total;
    // 비과세
    private Integer tax_free;
    // 부가세
    private Integer vat;
    // 사용한 포인트
    private Integer point;
    // 할인
    private Integer discount;
    // 컵 보증금
    private Integer green_deposit;

}
