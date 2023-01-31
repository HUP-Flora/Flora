package com.ssafy.floraserver.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stores")
@NoArgsConstructor
@Getter
public class Store extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sId;

    // 연관관계 필요
    @Column(nullable = false)
    private int uId;

    @Column(nullable = false)
    private String uBusinessLicense;

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

    private String sIsOnair;

    private String sHoliday;

    // 연관관계 필요
    @Column(nullable = false)
    private int sStart;

    // 연관관계 필요
    @Column(nullable = false)
    private int sEnd;

    private String sImgOriginalName;

    private String sImgNewName;

    private int sImgSize;

    private String sImgPath;

    private String sImgField;

    private LocalDateTime sImgUploadTime;
}
