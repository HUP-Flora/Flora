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
    private ReceiptType recType;

    @Column(nullable = false)
    private String recOrderer;

    @Column(nullable = false)
    private String recOrdererPhoneNumber;

    private String recGiftMessage;

    private String recRecipient;

    private String recRecipientPhoneNumber;

    private LocalDate recReceiptDate;

    private String recDeliveryDestination;

    @Enumerated(EnumType.STRING)
    private ReceiptStatus recStatus;

    @Builder
    public Receipt(Order oId, ReceiptType recType, String recOrderer, String recOrdererPhoneNumber, String recGiftMessage, String recRecipient, String recRecipientPhoneNumber, LocalDate recReceiptDate, String recDeliveryDestination, ReceiptStatus recStatus) {
        this.oId = oId;
        this.recType = recType;
        this.recOrderer = recOrderer;
        this.recOrdererPhoneNumber = recOrdererPhoneNumber;
        this.recGiftMessage = recGiftMessage;
        this.recRecipient = recRecipient;
        this.recRecipientPhoneNumber = recRecipientPhoneNumber;
        this.recReceiptDate = recReceiptDate;
        this.recDeliveryDestination = recDeliveryDestination;
        this.recStatus = recStatus;
    }
}
