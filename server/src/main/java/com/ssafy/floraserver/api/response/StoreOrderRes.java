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
    private String pName;
    private String orderDate;
    private String pImg;
    private int payment;
    private int status;

    @Builder
    public StoreOrderRes(Order order, int status) {
        this.oId = order.getOId();
        this.pName = order.getPId().getName();
        this.orderDate = order.getDate().toString();
        this.pImg = order.getPId().getImgPath();
        this.payment = order.getPayment();
        this.status = status;
    }
}
