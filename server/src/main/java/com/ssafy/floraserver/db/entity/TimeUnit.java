package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
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

    @Column(nullable = false)
    private String tuTime;
}
