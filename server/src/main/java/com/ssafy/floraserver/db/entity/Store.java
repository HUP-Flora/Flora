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

    // 연관관계 필요
    @Column(nullable = false)
    private Long uId;

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

    // 연관관계 필요
    @Column(nullable = false)
    private Long sStart;

    // 연관관계 필요
    @Column(nullable = false)
    private Long sEnd;

    private String sImgOriginalName;

    private String sImgNewName;

    private int sImgSize;

    private String sImgPath;

    private String sImgField;

    private LocalDateTime sImgUploadTime;
}
