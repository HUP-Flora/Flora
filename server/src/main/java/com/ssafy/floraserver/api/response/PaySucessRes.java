package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Receipt;
import com.ssafy.floraserver.db.entity.enums.ReceiptType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PaySucessRes {

    private String sName;
    private String addressName;
    private int payment;
    private String phoneNumber;
    private ReceiptType recType;
    private String recDeliveryDestination;

    public PaySucessRes(Order order) {
        this.sName = order.getSId().getName();
        this.phoneNumber = order.getSId().getPhoneNumber();
        this.addressName = order.getSId().getAddress_name();
        this.payment = order.getPayment();
        this.recType = order.getRecId().getType();
        this.recDeliveryDestination = order.getRecId().getDeliveryDestination();
    }
}
