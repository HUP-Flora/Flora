package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptType;
import lombok.AccessLevel;
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

    // 연관관계 필요
    private Long oId;

    // 연관관계 필요
    private Long sId;

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
}
