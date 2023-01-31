package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@Getter
public class Order extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long oId;

    @Column(nullable = false)
    private String oNum;

    private LocalDate oDate;

    private OrderStatus oStatus;

    private OrderType oType;

    private int oPayment;

    private String oPaymentNum;

    private PaymentStatus oPaymentStatus;

    // 연관관계 필요
    private int uId;

    // 연관관계 필요
    private int revId;

    // 연관관계 필요
    private int sId;

    // 연관관계 필요
    private int pid;
}
