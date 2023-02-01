package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import lombok.AccessLevel;
import lombok.Builder;
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
    private String num;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    private OrderType type;

    private int payment;

    private String paymentNum;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    // 주문 - 사용자
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", nullable = false)
    private User uId;

    // 주문 - 리뷰
    // 일대일 단방향
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rev_id")
    private Review revId;

    // 주문 - 가게
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", nullable = false)
    private Store sId;

    // 주문 - 상품
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_id", nullable = false)
    private Product pId;

    @Builder
    public Order(String num, LocalDate date, OrderStatus status, OrderType type, int payment, String paymentNum, PaymentStatus paymentStatus, User uId, Review revId, Store sId, Product pId) {
        this.num = num;
        this.date = date;
        this.status = status;
        this.type = type;
        this.payment = payment;
        this.paymentNum = paymentNum;
        this.paymentStatus = paymentStatus;
        this.uId = uId;
        this.revId = revId;
        this.sId = sId;
        this.pId = pId;
    }
}
