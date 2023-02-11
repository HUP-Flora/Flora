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
    private String orderDate;
    private int status;
    private int payment;
    private boolean review;
    private String sImg;

    @Builder
    public UserOrderRes(Order order, int status) {
        this.oId = order.getOId();
        this.sId = order.getSId().getSId();
        this.orderDate = order.getDate().toString();
        this.status = status;
        this.payment = order.getPayment();
        this.review = order.isReview();
        this.sImg = order.getSId().getImgPath();
    }
}
