package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
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

    @Column(name = "con_reservation_date", nullable = false)
    private LocalDate reservationDate;

    // 화상미팅 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "con_reservation_time")
    private TimeUnit reservationTime;

    @Column(name = "con_start_time")
    private LocalTime startTime;

    @Column(name = "con_link")
    private String link;

    @Column(name = "con_session_id")
    private String sessionId;

    @Column(name = "con_token")
    private String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "con_status")
    private ConferenceStatus status;

    @Builder
    public Conference(LocalDate reservationDate, TimeUnit reservationTime, LocalTime startTime, String link, String sessionId, String token, ConferenceStatus status){
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.startTime = startTime;
        this.link = link;
        this.sessionId = sessionId;
        this.token = token;
        this.status = status;
    }

    public void updateStatus(ConferenceStatus conferenceStatus) {
        this.status = conferenceStatus;
    }
}
