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

    @Column(name = "o_num", nullable = false)
    private String num;

    @Column(name = "o_date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "o_status")
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "o_type")
    private OrderType type;

    @Column(name = "o_payment")
    private int payment;

    @Column(name = "o_payment_num")
    private String paymentNum;

    @Enumerated(EnumType.STRING)
    @Column(name = "o_payment_status")
    private PaymentStatus paymentStatus;

    // 주문 - 사용자
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", nullable = false)
    private User uId;

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

    // 주문 - 화상미팅
    // 일대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "con_id")
    private Conference conId;

    // 주문 - 수령
    // 일대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_id")
    private Receipt recId;

    @Column(name = "o_review", columnDefinition = "TINYINT(1)")
    private boolean review;

    public void setReviewflag(boolean flag){
        this.review = flag;
    }

    @Builder
    public Order(String num, LocalDate date, OrderStatus status, OrderType type, User uId, Store sId, Product pId, Conference conId) {
        this.num = num;
        this.date = date;
        this.status = status;
        this.type = type;
        this.payment = 0;
        this.paymentNum = null;
        this.paymentStatus = PaymentStatus.UNDONE;
        this.uId = uId;
        this.sId = sId;
        this.pId = pId;
        this.conId = conId;
        this.review = false;
    }

    public void updateStatus(OrderStatus status) {
        this.status = status;
    }

    public void updatePayment(int payment) {
        this.payment = payment;
    }

    public void updatePaymentNum(String paymentNum) {
        this.paymentNum = paymentNum;
    }

    public void updatePaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
