package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "receipts")
@NoArgsConstructor
@Getter
public class Receipt extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recId;

    // 연관관계 필요
    private int oId;

    // 연관관계 필요
    private int sId;

    @Column(nullable = false)
    private ReceiptType recType;

    @Column(nullable = false)
    private String recOrderer;

    @Column(nullable = false)
    private String recOrdererPhoneNumber;

    private String recGiftMessage;

    private String recRercipient;

    private String recRecipientPhoneNumber;

    private LocalDate recReceiptDate;

    private String recDeliveryDestination;

    private ReceiptStatus recStatus;
}
