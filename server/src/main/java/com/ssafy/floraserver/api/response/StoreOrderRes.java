package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StoreOrderRes {
    private Long oId;
    private String pName;
    private String orderDate;
    private String pImg;
    private int payment;
    private int status;

    @Builder
    public StoreOrderRes(Order order, int status, Product defaultProduct) {
        this.oId = order.getOId();
        this.pName = order.getPId() == null ? defaultProduct.getName() : order.getPId().getName();
        this.orderDate = order.getDate().toString();
        this.pImg = order.getPId() == null ? defaultProduct.getImgPath() : order.getPId().getImgPath();
        this.payment = order.getPayment();
        this.status = status;
    }
}
