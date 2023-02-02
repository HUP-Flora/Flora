package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "receipts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Receipt extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recId;

    // 수령 - 주문
    // 다대일 단방향
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "o_id", nullable = false)
    private Order oId;

    @Enumerated(EnumType.STRING)
    @Column(name = "rec_type", nullable = false)
    private ReceiptType type;

    @Column(name = "rec_orderer", nullable = false)
    private String orderer;

    @Column(name = "rec_orderer_phone_number", nullable = false)
    private String ordererPhoneNumber;

    @Column(name = "rec_gift_message")
    private String giftMessage;

    @Column(name = "rec_recipient")
    private String recipient;

    @Column(name = "rec_recipient_phone_number")
    private String recipientPhoneNumber;

    @Column(name = "rec_receipt_date")
    private LocalDate receiptDate;

    @Column(name = "rec_delivery_destination")
    private String deliveryDestination;

    @Enumerated(EnumType.STRING)
    @Column(name = "rec_status")
    private ReceiptStatus status;

    @Builder
    public Receipt(Order oId, ReceiptType type, String orderer, String ordererPhoneNumber, String giftMessage, String recipient, String recipientPhoneNumber, LocalDate receiptDate, String deliveryDestination, ReceiptStatus status) {
        this.oId = oId;
        this.type = type;
        this.orderer = orderer;
        this.ordererPhoneNumber = ordererPhoneNumber;
        this.giftMessage = giftMessage;
        this.recipient = recipient;
        this.recipientPhoneNumber = recipientPhoneNumber;
        this.receiptDate = receiptDate;
        this.deliveryDestination = deliveryDestination;
        this.status = status;
    }
}
