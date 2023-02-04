package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long repId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "o_id", nullable = false)
    private Order oId;

    @Column(name = "rep_date", nullable = false)
    private LocalDateTime date;

    @Builder
    public Report(Order oId, LocalDateTime date) {
        this.oId = oId;
        this.date = date;
    }
}
