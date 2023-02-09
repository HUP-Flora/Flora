package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long revId;

    // 리뷰 - 사용자
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", nullable = false)
    private User uId;

    // 리뷰 - 가게
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", nullable = false)
    private Store sId;

    // 리뷰 - 주문
    // 일대일 단방향
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "o_id", nullable = false)
    private Order oId;

    @Column(name = "rev_content", nullable = false)
    private String content;

    @Column(name = "rev_create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "rev_img_original_name")
    private String imgOriginalName;

    @Column(name = "rev_img_new_name")
    private String imgNewName;

    @Column(name = "rev_img_path")
    private String imgPath;

    @Column(name = "rev_img_upload_time")
    private LocalDateTime imgUploadTime;

    @Builder
    public Review(User uId, Store sId, Order oId, String content, String imgOriginalName, String imgNewName, String imgPath, LocalDateTime imgUploadTime) {
        this.uId = uId;
        this.sId = sId;
        this.oId = oId;
        this.content = content;
        this.createDate = LocalDateTime.now();
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgPath = imgPath;
        this.imgUploadTime = imgUploadTime;
    }
}
