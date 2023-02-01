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

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate createDate;

    private String imgOriginalName;

    private String imgNewName;

    private int imgSize;

    private String imgPath;

    private String imgField;

    private LocalDateTime imgUploadTime;

    @Builder
    public Review(User uId, Store sId, String content, LocalDate createDate, String imgOriginalName, String imgNewName, int imgSize, String imgPath, String imgField, LocalDateTime imgUploadTime) {
        this.uId = uId;
        this.sId = sId;
        this.content = content;
        this.createDate = createDate;
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgSize = imgSize;
        this.imgPath = imgPath;
        this.imgField = imgField;
        this.imgUploadTime = imgUploadTime;
    }
}
