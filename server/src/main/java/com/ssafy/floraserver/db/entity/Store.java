package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.AccessLevel;
import lombok.Builder;
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
    private String businessLicense;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String sido;

    @Column(nullable = false)
    private String gugun;

    @Column(nullable = false)
    private String dong;

    @Column(nullable = false)
    private String detailedAddress;

    @Column(nullable = false)
    private float lat;

    @Column(nullable = false)
    private float lng;

    @Column(nullable = false)
    private String desc;

    @Enumerated(EnumType.STRING)
    private OnAirType isOnair;

    private String holiday;

    // 가게 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_start", nullable = false)
    private TimeUnit start;

    // 가게 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_end", nullable = false)
    private TimeUnit end;

    private String imgOriginalName;

    private String imgNewName;

    private int imgSize;

    private String imgPath;

    private String imgField;

    private LocalDateTime imgUploadTime;

    @Builder
    public Store(User uId, String businessLicense, String name, String sPhoneNumber, String sido, String gugun, String dong, String detailedAddress, float lat, float lng, String desc, OnAirType isOnair, String holiday, TimeUnit start, TimeUnit end, String imgOriginalName, String imgNewName, int imgSize, String imgPath, String imgField, LocalDateTime imgUploadTime) {
        this.uId = uId;
        this.businessLicense = businessLicense;
        this.name = name;
        this.phoneNumber = sPhoneNumber;
        this.sido = sido;
        this.gugun = gugun;
        this.dong = dong;
        this.detailedAddress = detailedAddress;
        this.lat = lat;
        this.lng = lng;
        this.desc = desc;
        this.isOnair = isOnair;
        this.holiday = holiday;
        this.start = start;
        this.end = end;
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgSize = imgSize;
        this.imgPath = imgPath;
        this.imgField = imgField;
        this.imgUploadTime = imgUploadTime;
    }
}
