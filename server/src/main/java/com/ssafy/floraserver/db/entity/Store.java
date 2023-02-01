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
    @JoinColumn(name = "s_start", nullable = false)
    private TimeUnit sStart;

    // 가게 - 시간단위
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_end", nullable = false)
    private TimeUnit sEnd;

    private String sImgOriginalName;

    private String sImgNewName;

    private int sImgSize;

    private String sImgPath;

    private String sImgField;

    private LocalDateTime sImgUploadTime;

    @Builder
    public Store(User uId, String sBusinessLicense, String sName, String sPhoneNumber, String sSido, String sGugun, String sDong, String sDetailedAddress, float sLat, float sLng, String sDesc, OnAirType sIsOnair, String sHoliday, TimeUnit sStart, TimeUnit sEnd, String sImgOriginalName, String sImgNewName, int sImgSize, String sImgPath, String sImgField, LocalDateTime sImgUploadTime) {
        this.uId = uId;
        this.sBusinessLicense = sBusinessLicense;
        this.sName = sName;
        this.sPhoneNumber = sPhoneNumber;
        this.sSido = sSido;
        this.sGugun = sGugun;
        this.sDong = sDong;
        this.sDetailedAddress = sDetailedAddress;
        this.sLat = sLat;
        this.sLng = sLng;
        this.sDesc = sDesc;
        this.sIsOnair = sIsOnair;
        this.sHoliday = sHoliday;
        this.sStart = sStart;
        this.sEnd = sEnd;
        this.sImgOriginalName = sImgOriginalName;
        this.sImgNewName = sImgNewName;
        this.sImgSize = sImgSize;
        this.sImgPath = sImgPath;
        this.sImgField = sImgField;
        this.sImgUploadTime = sImgUploadTime;
    }
}
