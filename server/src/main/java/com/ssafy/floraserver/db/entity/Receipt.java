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
    @Column(nullable = false)
    private ReceiptType type;

    @Column(nullable = false)
    private String orderer;

    @Column(nullable = false)
    private String ordererPhoneNumber;

    private String giftMessage;

    private String recipient;

    private String recipientPhoneNumber;

    private LocalDate receiptDate;

    private String deliveryDestination;

    @Enumerated(EnumType.STRING)
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
