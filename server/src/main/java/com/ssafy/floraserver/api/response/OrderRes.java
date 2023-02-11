package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class OrderRes {
    private Long oId;
    private String num;
    private LocalDate date;
    private String sName;
    private String pName;
    private String pImg;
    private String paymentNum;
    private int payment;
    private int status;
    @Builder
    public OrderRes(Order order, int status) {
        this.oId = order.getOId();
        this.num = order.getNum();
        this.date = order.getDate();
        this.sName = order.getSId().getName();
        this.pName = order.getPId().getName();
        this.pImg = order.getPId().getImgPath();
        this.paymentNum = order.getPaymentNum();
        this.payment = order.getPayment();
        this.status = status;
    }
}
