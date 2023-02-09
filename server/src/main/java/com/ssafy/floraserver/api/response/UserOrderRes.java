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
    private String pName;
    private LocalDate receiptDate;
    private int payment;
    private boolean review;
    private String sImg;

    @Builder
    public UserOrderRes(Order order) {
        this.oId = order.getOId();
        this.sId = order.getSId().getSId();
        this.pName = order.getPId().getName();
        this.receiptDate = order.getRecId().getReceiptDate();
        this.payment = order.getPayment();
        this.review = order.isReview();
        this.sImg = order.getSId().getImgPath();
    }
}
