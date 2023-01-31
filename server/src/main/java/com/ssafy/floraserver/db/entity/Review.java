package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
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

    // 연관관계 필요
    private Long uId;

    // 연관관계 필요
    private Long sId;

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


}
