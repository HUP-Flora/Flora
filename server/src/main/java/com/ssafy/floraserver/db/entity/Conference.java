package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import lombok.AccessLevel;
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

    // 연관관계 필요
    private Long oId;

    @Column(nullable = false)
    private LocalDate conReservationDate;

    // 연관관계 필요
    private Long conReservationTime;

    private LocalTime conStartTime;

    @Column(nullable = false)
    private String conLink;

    @Enumerated(EnumType.STRING)
    private ConferenceStatus conStatus;
}
