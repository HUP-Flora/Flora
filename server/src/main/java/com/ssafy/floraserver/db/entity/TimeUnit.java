package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "time_unit")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TimeUnit extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tuId;

    @Column(name = "tu_time", nullable = false)
    private String time;

    @Builder
    public TimeUnit(String time) {
        this.time = time;
    }
}
