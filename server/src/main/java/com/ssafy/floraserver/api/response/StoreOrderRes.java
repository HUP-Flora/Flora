package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Receipt;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class StoreOrderRes {
    private Long oId;
    private String sName;
    private LocalDate receiptDate;
    private String pImg;
    private int payment;
    private PaymentStatus paymentStatus;
    private ReceiptStatus recStatus;

    @Builder
    public StoreOrderRes(Order order) {
        this.oId = order.getOId();
        this.sName = order.getSId().getName();
        this.receiptDate = order.getRecId().getReceiptDate();
        this.pImg = order.getPId().getImgPath();
        this.payment = order.getPayment();
        this.paymentStatus = order.getPaymentStatus();
        this.recStatus = order.getRecId().getStatus();
    }
}
