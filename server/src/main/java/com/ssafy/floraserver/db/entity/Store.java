package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stores")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class Store extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sId;

    // 가게 - 사용자
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", nullable = false)
    private User uId;

    @Column(name = "s_business_license", nullable = false)
    private String businessLicense;

    @Column(name = "s_name", nullable = false)
    private String name;

    @Column(name = "s_phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "region_1depth_name", nullable = false)
    private String region_1depth_name;

    @Column(name = "region_2depth_name", nullable = false)
    private String region_2depth_name;

    @Column(name = "region_3depth_name", nullable = false)
    private String region_3depth_name;

    @Column(name = "address_name", nullable = false)
    private String address_name;

    @Column(name = "s_lat", nullable = false)
    private float lat;

    @Column(name = "s_lng", nullable = false)
    private float lng;

    @Column(name = "s_desc", nullable = false)
    private String desc;

    @Enumerated(EnumType.STRING)
    @Column(name = "s_is_onair")
    private OnAirType isOnair;

    @Column(name = "s_holiday")
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

    @Column(name = "s_img_original_name")
    private String imgOriginalName;

    @Column(name = "s_img_new_name")
    private String imgNewName;

    @Column(name = "s_img_path")
    private String imgPath;

    @Column(name = "s_img_upload_time")
    private LocalDateTime imgUploadTime;

    @Formula("(select count(*) from bookmarks b where b.s_id = s_id)")
    private int bookmarkCnt;

    @Formula("(select count(*) from reviews r where r.s_id = s_id)")
    private int reviewCnt;

    @Builder
    public Store(User uId, String businessLicense, String name, String phoneNumber, String region_1depth_name, String region_2depth_name, String region_3depth_name, String address_name, float lat, float lng, String desc, String holiday, TimeUnit start, TimeUnit end, String imgOriginalName, String imgNewName, String imgPath, LocalDateTime imgUploadTime) {
        this.uId = uId;
        this.businessLicense = businessLicense;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.region_1depth_name = region_1depth_name;
        this.region_2depth_name = region_2depth_name;
        this.region_3depth_name = region_3depth_name;
        this.address_name = address_name;
        this.lat = lat;
        this.lng = lng;
        this.desc = desc;
        this.isOnair = OnAirType.OFF;
        this.holiday = holiday;
        this.start = start;
        this.end = end;
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgPath = imgPath;
        this.imgUploadTime = imgUploadTime;
    }
}
