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
    private String revContent;

    @Column(nullable = false)
    private LocalDate revCreateDate;

    private String revImgOriginalName;

    private String revImgNewName;

    private int revImgSize;

    private String revImgPath;

    private String revImgField;

    private LocalDateTime revImgUploadTime;

    @Builder
    public Review(User uId, Store sId, String revContent, LocalDate revCreateDate, String revImgOriginalName, String revImgNewName, int revImgSize, String revImgPath, String revImgField, LocalDateTime revImgUploadTime) {
        this.uId = uId;
        this.sId = sId;
        this.revContent = revContent;
        this.revCreateDate = revCreateDate;
        this.revImgOriginalName = revImgOriginalName;
        this.revImgNewName = revImgNewName;
        this.revImgSize = revImgSize;
        this.revImgPath = revImgPath;
        this.revImgField = revImgField;
        this.revImgUploadTime = revImgUploadTime;
    }
}
