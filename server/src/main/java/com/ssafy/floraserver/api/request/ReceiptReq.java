package com.ssafy.floraserver.api.request;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptType;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Getter
public class ReceiptReq {

    private ReceiptType type;
    private String orderer;
    private String ordererPhoneNumber;
    private String recipient;
    private String receipientPhoneNumber;
    private String deliveryDestination;
    private String giftMessage;
}