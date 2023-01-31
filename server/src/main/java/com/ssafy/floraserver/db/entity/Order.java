package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Order extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long oId;

    @Column(nullable = false)
    private String oNum;

    private LocalDate oDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus oStatus;

    @Enumerated(EnumType.STRING)
    private OrderType oType;

    private int oPayment;

    private String oPaymentNum;

    @Enumerated(EnumType.STRING)
    private PaymentStatus oPaymentStatus;

    // 연관관계 필요
    private Long uId;

    // 연관관계 필요
    private Long revId;

    // 연관관계 필요
    private Long sId;

    // 연관관계 필요
    private Long pId;
}
