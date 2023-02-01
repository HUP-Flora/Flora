package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "conferences")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Conference extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conId;

    // 화상미팅 - 주문
    // 다대일 단방향
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "o_id", nullable = false)
    private Order oId;

    @Column(nullable = false)
    private LocalDate reservationDate;

    // 화상미팅 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "con_reservation_time", nullable = false)
    private TimeUnit reservationTime;

    private LocalTime startTime;

    @Column(nullable = false)
    private String link;

    @Enumerated(EnumType.STRING)
    private ConferenceStatus status;

    @Builder
    public Conference(Order oId, LocalDate reservationDate, TimeUnit reservationTime, LocalTime startTime, String link, ConferenceStatus status){
        this.oId = oId;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.startTime = startTime;
        this.link = link;
        this.status = status;
    }
}
