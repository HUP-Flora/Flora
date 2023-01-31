package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stores")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Store extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sId;

    // 가게 - 사용자
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", nullable = false)
    private User uId;

    @Column(nullable = false)
    private String sBusinessLicense;

    @Column(nullable = false)
    private String sName;

    @Column(nullable = false)
    private String sPhoneNumber;

    @Column(nullable = false)
    private String sSido;

    @Column(nullable = false)
    private String sGugun;

    @Column(nullable = false)
    private String sDong;

    @Column(nullable = false)
    private String sDetailedAddress;

    @Column(nullable = false)
    private float sLat;

    @Column(nullable = false)
    private float sLng;

    @Column(nullable = false)
    private String sDesc;

    @Enumerated(EnumType.STRING)
    private OnAirType sIsOnair;

    private String sHoliday;

    // 가게 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tu_id", nullable = false)
    private TimeUnit sStart;

    // 가게 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tu_id", nullable = false)
    private TimeUnit sEnd;

    private String sImgOriginalName;

    private String sImgNewName;

    private int sImgSize;

    private String sImgPath;

    private String sImgField;

    private LocalDateTime sImgUploadTime;
}
