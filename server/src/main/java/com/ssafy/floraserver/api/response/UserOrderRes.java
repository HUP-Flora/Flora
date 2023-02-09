package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Receipt;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class UserOrderRes {

    private Long oId;
    private Long sId;
    private String sName;
    private LocalDate receiptDate;
    private String sImg;

    @Builder
    public UserOrderRes(Order order) {
        this.oId = order.getOId();
        this.sId = order.getSId().getSId();
        this.sName = order.getSId().getName();
        this.receiptDate = order.getRecId().getReceiptDate();
        this.sImg = order.getSId().getImgPath();
    }
}
