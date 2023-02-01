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
    private LocalDate conReservationDate;

    // 화상미팅 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "con_reservation_time", nullable = false)
    private TimeUnit conReservationTime;

    private LocalTime conStartTime;

    @Column(nullable = false)
    private String conLink;

    @Enumerated(EnumType.STRING)
    private ConferenceStatus conStatus;

    @Builder
    public Conference(Order oId, LocalDate conReservationDate, TimeUnit conReservationTime, LocalTime conStartTime, String conLink, ConferenceStatus conStatus){
        this.oId = oId;
        this.conReservationDate = conReservationDate;
        this.conReservationTime = conReservationTime;
        this.conStartTime = conStartTime;
        this.conLink = conLink;
        this.conStatus = conStatus;
    }
}
